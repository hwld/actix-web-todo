import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import {
  ChangeCommandTextsDialog,
  ChangeCommandTextsDialogProps,
} from "./ChangeCommandTextsDialog";
import { CommonTaskItemProps } from "./CommonTaskItem";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type ChangeCommandTextsTodoItemProps = CommonTaskItemProps & {
  defaultCommandTexts: ChangeCommandTextsDialogProps["defaultCommandTexts"];
  onChangeCommandTexts: ChangeCommandTextsDialogProps["onChangeCommandTexts"];
};

const Component: React.VFC<ChangeCommandTextsTodoItemProps> = ({
  className,
  task,
  onDeleteTask,
  onUpdateTodo,
  defaultCommandTexts,
  onChangeCommandTexts,
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

  const handleChangeCommandTexts: ChangeCommandTextsDialogProps["onChangeCommandTexts"] =
    async (texts) => {
      onChangeCommandTexts(texts);

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
      <ChangeCommandTextsDialog
        isOpen={isOpen}
        onClose={onClose}
        defaultCommandTexts={defaultCommandTexts}
        onChangeCommandTexts={handleChangeCommandTexts}
      />
    </>
  );
};

export const ChangeCommandTextsTodoItem = chakra(Component);
