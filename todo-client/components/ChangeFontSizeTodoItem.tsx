import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
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
  "onChangeChecked"
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
    isDone
  ) => {
    if (isDone) {
      onOpen();
    }
    return "NoError";
  };

  const handleChangeFontSize = async (fontSize: TaskFontSize) => {
    onChangeFontSize(fontSize);

    await onUpdateTodo({ id: task.id, isDone: true });
    onDeleteTask({ id: task.id });
  };

  return (
    <>
      <TaskItemBase
        className={className}
        task={task}
        onDeleteTask={onDeleteTask}
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
