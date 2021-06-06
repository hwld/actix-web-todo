import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useTaskFontSize = (): [
  number,
  Dispatch<SetStateAction<number>>
] => {
  const key = "taskFontSize";
  const [taskFontSize, innerSetTaskFontSize] = useState(1);

  const setTaskFontSize: Dispatch<SetStateAction<number>> = (state) => {
    const fontSize = typeof state === "number" ? state : state(taskFontSize);

    innerSetTaskFontSize(fontSize);
    localStorage.setItem(key, `${fontSize}`);
  };

  // localStorageから初期値を読み出す
  useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) {
      return;
    }

    const fontSize = parseInt(item);
    if (isNaN(fontSize)) {
      return;
    }

    setTaskFontSize(fontSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [taskFontSize, setTaskFontSize];
};
