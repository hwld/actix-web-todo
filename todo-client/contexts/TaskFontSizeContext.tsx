import { useContext } from "react";
import { createContext, useCallback, useEffect, useState } from "react";

const TASK_FONT_SIZE_UNIT = "rem";

export type TaskFontSize = `${number}${typeof TASK_FONT_SIZE_UNIT}`;
export type TaskFonTSizeUpdate = (size: TaskFontSize) => void;

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

const useTaskFontSizeState = (): [
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
  }, [setTaskFontSize]);

  return [taskFontSize, setTaskFontSize];
};

export const TaskFontSizeContext = createContext<TaskFontSize>("1rem");
export const TaskFontSizeUpdateContext = createContext<TaskFonTSizeUpdate>(
  () => {
    // noop
  }
);

export const TaskFontSizeProvider: React.FC = ({ children }) => {
  const [taskFontSize, setTaskFontSize] = useTaskFontSizeState();

  return (
    <TaskFontSizeContext.Provider value={taskFontSize}>
      <TaskFontSizeUpdateContext.Provider value={setTaskFontSize}>
        {children}
      </TaskFontSizeUpdateContext.Provider>
    </TaskFontSizeContext.Provider>
  );
};

export const useTaskFontSize = (): TaskFontSize => {
  return useContext(TaskFontSizeContext);
};

export const useTaskFontSizeUpdate = (): TaskFonTSizeUpdate => {
  return useContext(TaskFontSizeUpdateContext);
};
