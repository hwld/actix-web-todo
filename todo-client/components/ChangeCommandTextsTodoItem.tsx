import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
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
  defaultCommandInfos: ChangeCommandTextsDialogProps["defaultCommandInfos"];
  onChangeCommandTexts: ChangeCommandTextsDialogProps["onChangeCommandTexts"];
};

const Component = forwardRef<HTMLDivElement, ChangeCommandTextsTodoItemProps>(
  (
    {
      className,
      task,
      onDeleteTask,
      onUpdateTodo,
      defaultCommandInfos,
      onChangeCommandTexts,
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

    const handleChangeCommandTexts: ChangeCommandTextsDialogProps["onChangeCommandTexts"] = async (
      commandTexts
    ) => {
      setIsChecked(true);
      onChangeCommandTexts(commandTexts);

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
        <ChangeCommandTextsDialog
          isOpen={isOpen}
          onClose={onClose}
          defaultCommandInfos={defaultCommandInfos}
          onChangeCommandTexts={handleChangeCommandTexts}
        />
      </>
    );
  }
);

export const ChangeCommandTextsTodoItem = chakra(Component);
