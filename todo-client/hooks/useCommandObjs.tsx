import { useCallback, useEffect, useState } from "react";

const commandList = [
  "giveUpAll",
  "changeFontSize",
  "changeCommandObjs",
] as const;
export type Command = typeof commandList[number];
export type AllCommandObjs = {
  [P in Command]: { text: string; description: string };
};

export function isCommand(value: string): value is Command {
  return commandList.includes(value as Command);
}

// CommandObjsの変更に追従できる気がしないので、後でio-tsを使って自動でユーザー定義型ガードを作りたい。
function isAllCommandObjs(value: unknown): value is AllCommandObjs {
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

  // null | undefined なら、どんなプロパティにアクセスしてもundefinedであることが保証できる。
  const obj = u as Record<string, unknown>;

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
  const commandObj = obj as Record<Command, unknown>;
  if (
    commandList.some((command) => {
      return commandObj[command] == null;
    })
  ) {
    return false;
  }

  const nonNullCommandObj = commandObj as Record<
    Command,
    Record<string, unknown>
  >;

  return commandList.every(
    (command) =>
      typeof nonNullCommandObj[command].text === "string" &&
      typeof nonNullCommandObj[command].description === "string"
  );
}

export const useAllCommandObjs = (): [
  AllCommandObjs,
  (commandObjs: AllCommandObjs) => void
] => {
  const key = "allCommandObjs";
  const [allCommandObjs, internalSetAllCommandObjs] = useState<AllCommandObjs>({
    giveUpAll: {
      text: "すべてを諦める",
      description: "すべてのTodoアイテムを削除します。",
    },
    changeFontSize: {
      text: "文字のサイズを変える",
      description: "Taskの文字の大きさを変更します。",
    },
    changeCommandObjs: {
      text: "コマンドを変える",
      description: "コマンドのテキストを変更します",
    },
  });

  const setCommandObjs = useCallback((commandObjs: AllCommandObjs) => {
    internalSetAllCommandObjs(commandObjs);
    localStorage.setItem(key, JSON.stringify(commandObjs));
  }, []);

  // localStorageから初期値を読み出す
  useEffect(() => {
    const commandObjs = localStorage.getItem(key);
    if (!commandObjs || !isAllCommandObjs(commandObjs)) {
      return;
    }

    setCommandObjs(commandObjs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [allCommandObjs, setCommandObjs];
};
