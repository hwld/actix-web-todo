import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
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

const Component = forwardRef<HTMLDivElement, ChangeFontSizeTodoItemProps>(
  (
    {
      className,
      task,
      onDeleteTask,
      onUpdateTodo,
      defaultFontSize,
      onChangeFontSize,
    },
    ref
  ) => {
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
          ref={ref}
          className={className}
          task={task}
          onDeleteTask={onDeleteTask}
          checked={isChecked}
          onChangeChecked={handleChangeChecked}
        />
        <ChangeFontSizeDialog
          isOpen={isOpen}
          onClose={onClose}
          defaultFontSize={defaultFontSize}
          onChangeFontSize={handleChangeFontSize}
        />
      </>
    );
  }
);

export const ChangeFontSizeTodoItem = chakra(Component);
