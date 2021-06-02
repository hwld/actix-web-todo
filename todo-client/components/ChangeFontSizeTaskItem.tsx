import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { UpdateTaskRequest } from "../api/task";
import { ChangeFontSizeDialog } from "./ChangeFontSizeDialog";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";

type Props = CommonTaskItemProps & {
  className?: string;
  defaultFontSize: number;
  onChangeFontSize: (fontSize: number) => void;
};

const Component: React.VFC<Props> = ({
  className,
  task,
  onDeleteTask,
  onChangeChecked,
  defaultFontSize,
  onChangeFontSize,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = async (req: UpdateTaskRequest) => {
    if (req.isDone) {
      onOpen();
    }
  };

  const handleChangeFontSize = async (fontSize: number) => {
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

export const ChangeFontSizeTaskItem = chakra(Component);
