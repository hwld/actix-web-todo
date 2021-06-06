import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { UpdateTaskRequest } from "../api/task";
import { TaskFontSize } from "../hooks/useTaskFontSize";
import { ErrorType } from "../hooks/useTasks";
import {
  ChangeFontSizeDialog,
  ChangeFontSizeDialogProps,
} from "./ChangeFontSizeDialog";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";

export type ChangeFontSizeTodoItemProps = CommonTaskItemProps & {
  defaultFontSize: ChangeFontSizeDialogProps["defaultFontSize"];
  onChangeFontSize: ChangeFontSizeDialogProps["onChangeFontSize"];
};

const Component: React.VFC<ChangeFontSizeTodoItemProps> = ({
  className,
  task,
  onDeleteTask,
  onChangeChecked,
  defaultFontSize,
  onChangeFontSize,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = async (
    req: UpdateTaskRequest
  ): Promise<ErrorType> => {
    if (req.isDone) {
      onOpen();
    }
    return "NoError";
  };

  const handleChangeFontSize = async (fontSize: TaskFontSize) => {
    onChangeFontSize(fontSize);

    await onChangeChecked({ id: task.id, isDone: true });
    onDeleteTask({ id: task.id });
  };

  return (
    <>
      <CommonTaskItem
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
