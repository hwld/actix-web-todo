import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import { UseTasksResult } from "../hooks/useTasks";
import {
  ChangeCommandTextsDialog,
  ChangeCommandTextsDialogProps,
} from "./ChangeCommandTextsDialog";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type ChangeCommandTextsTodoItemProps = Omit<
  TaskItemBaseProps,
  "onChangeChecked" | "checked"
> & {
  onUpdateTodo: UseTasksResult["updateTask"];
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
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
    isDone
  ) => {
    if (isDone) {
      onOpen();
    }
  };

  const handleChangeCommandTexts: ChangeCommandTextsDialogProps["onChangeCommandTexts"] = async (
    texts
  ) => {
    setIsChecked(true);
    onChangeCommandTexts(texts);

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
