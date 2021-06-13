import { useCallback, useEffect, useMemo, useState } from "react";

const commandList = [
  "giveUpAll",
  "changeFontSize",
  "changeCommandText",
] as const;
export type Command = typeof commandList[number];
export type CommandInfo = {
  command: Command;
  text: string;
  description: string;
};
export type AllCommandsInfo = {
  [P in Command]: Omit<CommandInfo, "command">;
};

export function isCommand(value: string): value is Command {
  return commandList.includes(value as Command);
}

// CommandsInfoの変更に追従できる気がしないので、後でio-tsを使って自動でユーザー定義型ガードを作りたい。
function isAllCommandsInfo(value: unknown): value is AllCommandsInfo {
  if (value == null) {
    return false;
  }
  // null | undefined なら、どんなプロパティにアクセスしてもundefinedであることが保証できる。
  const obj = value as Record<string, unknown>;
  // commandのリストと重複を排除したobjのkeyの数が等しくない
  const uniqueKeys = Array.from(new Set(Object.keys(obj)));
  if (uniqueKeys.length !== commandList.length) {
    return false;
  }

  // コマンドが全て含まれていない。
  if (!commandList.every((command) => uniqueKeys.includes(command))) {
    return false;
  }

  // コマンドをkeyとしたときにオブジェクトにnull値が存在する
  const commandsInfo = obj as Record<Command, unknown>;
  if (
    commandList.some((command) => {
      return commandsInfo[command] == null;
    })
  ) {
    return false;
  }

  // オブジェクトの各フィールドがnullじゃないことが保証された
  const nonNullCommandsInfo = commandsInfo as Record<
    Command,
    Record<string, unknown>
  >;
  return commandList.every(
    (command) =>
      typeof nonNullCommandsInfo[command].text === "string" &&
      typeof nonNullCommandsInfo[command].description === "string"
  );
}

type useCommandsInfoResult = {
  commandInfoList: CommandInfo[];
  changeCommandTexts: (
    commandTexts: Pick<CommandInfo, "command" | "text">[]
  ) => void;
  getCommandText: (command: Command) => string;
};

export const useCommandInfos = (): useCommandsInfoResult => {
  const key = "commandsInfo";
  const [commandsInfo, internalSetCommandsInfo] = useState<AllCommandsInfo>({
    giveUpAll: {
      text: "すべてを諦める",
      description: "すべてのTodoアイテムを削除します。",
    },
    changeFontSize: {
      text: "文字のサイズを変える",
      description: "Taskの文字の大きさを変更します。",
    },
    changeCommandText: {
      text: "コマンドを変える",
      description: "コマンドのテキストを変更します",
    },
  });

  const setCommandsInfo = useCallback((commandsInfo: AllCommandsInfo) => {
    internalSetCommandsInfo(commandsInfo);
    localStorage.setItem(key, JSON.stringify(commandsInfo));
  }, []);

  const commandInfoList = useMemo(() => {
    const list: CommandInfo[] = [];
    Object.keys(commandsInfo).forEach((command) => {
      if (isCommand(command)) {
        list.push({
          command,
          text: commandsInfo[command].text,
          description: commandsInfo[command].description,
        });
      }
    });
    return list;
  }, [commandsInfo]);

  const changeCommandTexts = useCallback(
    (commandTexts: Pick<CommandInfo, "command" | "text">[]): void => {
      let newCommandsInfo = { ...commandsInfo };
      commandTexts.forEach(({ command, text }) => {
        newCommandsInfo = {
          ...newCommandsInfo,
          [command]: { text, description: commandsInfo[command].description },
        };
      });
      setCommandsInfo(newCommandsInfo);
    },
    [commandsInfo, setCommandsInfo]
  );

  const getCommandText = useCallback(
    (command: Command): string => {
      return commandsInfo[command].text;
    },
    [commandsInfo]
  );

  // localStorageから初期値を読み出す
  useEffect(() => {
    const commandsInfoStr = localStorage.getItem(key);
    if (!commandsInfoStr) {
      return;
    }

    let commandsInfo: unknown;
    try {
      commandsInfo = JSON.parse(commandsInfoStr);
    } catch {
      // 不正な値が入っていても、デフォルト値が存在するので無視する
      return;
    }
    if (!isAllCommandsInfo(commandsInfo)) {
      return;
    }

    internalSetCommandsInfo(commandsInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    commandInfoList,
    changeCommandTexts,
    getCommandText,
  };
};
