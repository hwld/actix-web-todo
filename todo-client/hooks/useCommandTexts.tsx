import { useCallback, useEffect, useState } from "react";

export type CommandTexts = {
  giveUpAll: string;
  changeFontSize: string;
};

// CommandTextsの変更に追従できる気がしないので、後でio-tsを使って自動でユーザー定義型ガードを作りたい。
function isCommandTexts(value: unknown): value is CommandTexts {
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

  // null | undefined じゃないからと言って Record<string, unknown>になるわけではないが、
  // jsではnull | undefined じゃないなら存在しないプロパティにアクセスしてもundefinedになるだけなので
  // エラーが発生しないことを保証できる
  const obj = u as Record<string, unknown>;

  return (
    typeof obj.giveUpAll === "string" && typeof obj.changeFontSize === "string"
  );
}

export const useCommandTexts = (): [
  CommandTexts,
  (commandTexts: CommandTexts) => void
] => {
  const key = "commandTexts";
  const [commandTexts, internalSetCommandTexts] = useState<CommandTexts>({
    giveUpAll: "すべてを諦める",
    changeFontSize: "文字のサイズを変える",
  });

  const setCommandTexts = useCallback((commandTexts: CommandTexts) => {
    internalSetCommandTexts(commandTexts);
    localStorage.setItem(key, JSON.stringify(commandTexts));
  }, []);

  // localStorageから初期値を読み出す
  useEffect(() => {
    const commandTexts = localStorage.getItem(key);
    if (!commandTexts || !isCommandTexts(commandTexts)) {
      return;
    }

    setCommandTexts(commandTexts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [commandTexts, setCommandTexts];
};
