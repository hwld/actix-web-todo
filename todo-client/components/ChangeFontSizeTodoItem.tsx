import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import { TaskFontSize } from "../hooks/useTaskFontSize";
import { UseTasksResult } from "../hooks/useTasks";
import {
  ChangeFontSizeDialog,
  ChangeFontSizeDialogProps,
} from "./ChangeFontSizeDialog";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

// TaskItemBasePropsのonChangeCheckedはコンポーネントの内側で作成する。
export type ChangeFontSizeTodoItemProps = Omit<
  TaskItemBaseProps,
  "onChangeChecked" | "checked"
> & {
  defaultFontSize: ChangeFontSizeDialogProps["defaultFontSize"];
  onChangeFontSize: ChangeFontSizeDialogProps["onChangeFontSize"];
  onUpdateTodo: UseTasksResult["updateTask"];
};

const Component: React.VFC<ChangeFontSizeTodoItemProps> = ({
  className,
  task,
  onDeleteTask,
  onUpdateTodo,
  defaultFontSize,
  onChangeFontSize,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
    isDone
  ) => {
    if (isDone) {
      onOpen();
    }
  };

  const handleChangeFontSize = async (fontSize: TaskFontSize) => {
    setIsChecked(true);
    onChangeFontSize(fontSize);

    const result = await onUpdateTodo({ id: task.id, isDone: true });
    if (result === "Error") {
      setIsChecked(false);
    }
    onDeleteTask({ id: task.id });
  };

  return (
    <>
      <TaskItemBase
        className={className}
        task={task}
        onDeleteTask={onDeleteTask}
        checked={isChecked}
        onChangeChecked={handleChangeChecked}
        {...props}
      />
      <ChangeFontSizeDialog
        isOpen={isOpen}
        onClose={onClose}
        defaultFontSize={defaultFontSize}
        onChangeFontSize={handleChangeFontSize}
      />
    </>
  );
};

export const ChangeFontSizeTodoItem = chakra(Component);
