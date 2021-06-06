import { useCallback, useEffect, useState } from "react";

const TASK_FONT_SIZE_UNIT = "rem";
export type TaskFontSize = `${number}${typeof TASK_FONT_SIZE_UNIT}`;
function isTaskFontSize(value: string): value is TaskFontSize {
  const numberPart = value.substring(
    0,
    value.length - TASK_FONT_SIZE_UNIT.length
  );
  const unitPart = value.substring(
    value.length - TASK_FONT_SIZE_UNIT.length,
    value.length
  );

  if (
    Number.isInteger(parseInt(numberPart)) &&
    unitPart === TASK_FONT_SIZE_UNIT
  ) {
    return true;
  }
  return false;
}
export function extractNumberPart(fontSize: TaskFontSize): number {
  const numberPartStr = fontSize.substring(
    0,
    fontSize.length - TASK_FONT_SIZE_UNIT.length
  );
  const numberPart = parseInt(numberPartStr);
  return numberPart;
}

export const useTaskFontSize = (): [
  TaskFontSize,
  (fontSize: TaskFontSize) => void
] => {
  const key = "taskFontSize";
  const [taskFontSize, innerSetTaskFontSize] = useState<TaskFontSize>("1rem");

  const setTaskFontSize = useCallback((fontSize: TaskFontSize) => {
    innerSetTaskFontSize(fontSize);
    localStorage.setItem(key, `${fontSize}`);
  }, []);

  // localStorageから初期値を読み出す
  useEffect(() => {
    const fontSize = localStorage.getItem(key);
    if (!fontSize || !isTaskFontSize(fontSize)) {
      return;
    }

    setTaskFontSize(fontSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [taskFontSize, setTaskFontSize];
};
