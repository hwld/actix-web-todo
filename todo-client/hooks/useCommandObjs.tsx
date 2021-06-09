import { useCallback, useEffect, useState } from "react";

const commandList = [
  "giveUpAll",
  "changeFontSize",
  "changeCommandObjs",
] as const;
export type Command = typeof commandList[number];
type CommandObj<T extends Command> = {
  command: T;
  text: string;
  description: string;
};
export type CommandObjs = [
  CommandObj<"giveUpAll">,
  CommandObj<"changeFontSize">,
  CommandObj<"changeCommandObjs">
];

export function isCommand(value: string): value is Command {
  return commandList.includes(value as Command);
}

// CommandObjsの変更に追従できる気がしないので、後でio-tsを使って自動でユーザー定義型ガードを作りたい。
function isCommandObjs(value: unknown): value is CommandObjs {
  let u: unknown;
  try {
    if (typeof value === "string") {
      u = JSON.parse(value);
    } else {
      u = value;
    }
  } catch {
    return false;
  }

  if (u == null) {
    return false;
  }

  if (!Array.isArray(u)) {
    return false;
  }

  // 同一スコープじゃなくても配列として扱うため
  const array: unknown[] = u;

  // null | undefinedなどが含まれていればCommandObjsではない
  if (!array.every((a) => a)) {
    return false;
  }

  // null | undefinedが含まれていないので、要素のなんのプロパティにアクセスしてもエラーは起きない。d
  const notNullArray = array as Record<string, unknown>[];
  const notNullCommands = notNullArray.map((e) => e.command);
  if (Array.from(new Set(notNullCommands)).length !== commandList.length) {
    return false;
  }

  const noDuplicationCommands = notNullCommands;
  // どちらのリストも要素数が同じで重複がないので、これですべてのコマンドが揃っていることを保証する。
  // commandListは重複を許してしまうが・・・
  if (
    !commandList.every((c) => {
      return noDuplicationCommands.includes(c);
    })
  ) {
    return false;
  }

  // 最後にcommand以外のプロパティの型を確認する
  return notNullArray.every(
    (e) => typeof e.text === "string" && typeof e.description === "string"
  );
}

export const useCommandObjs = (): [
  CommandObjs,
  (commandObjs: CommandObjs) => void
] => {
  const key = "commandObjs";
  const [commandObjs, internalSetCommandObjs] = useState<CommandObjs>([
    {
      command: "giveUpAll",
      text: "すべてを諦める",
      description: "すべてのTodoアイテムを削除します。",
    },
    {
      command: "changeFontSize",
      text: "文字のサイズを変える",
      description: "Taskの文字の大きさを変更します。",
    },
    {
      command: "changeCommandObjs",
      text: "コマンドを変える",
      description: "コマンドのテキストを変更します",
    },
  ]);

  const setCommandObjs = useCallback((commandObjs: CommandObjs) => {
    internalSetCommandObjs(commandObjs);
    localStorage.setItem(key, JSON.stringify(commandObjs));
  }, []);

  // localStorageから初期値を読み出す
  useEffect(() => {
    const commandObjs = localStorage.getItem(key);
    if (!commandObjs || !isCommandObjs(commandObjs)) {
      return;
    }

    setCommandObjs(commandObjs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [commandObjs, setCommandObjs];
};
