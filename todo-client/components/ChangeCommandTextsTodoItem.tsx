import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { Task } from "../api/task";
import { useTasksOperator } from "../contexts/TasksContext";
import {
  ChangeCommandTextsDialog,
  ChangeCommandTextsDialogProps,
} from "./ChangeCommandTextsDialog";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type ChangeCommandTextsTodoItemProps = {
  className?: string;
  task: Task;
  defaultCommandInfos: ChangeCommandTextsDialogProps["defaultCommandInfos"];
  onChangeCommandTexts: ChangeCommandTextsDialogProps["onChangeCommandTexts"];
};

const Component = forwardRef<HTMLDivElement, ChangeCommandTextsTodoItemProps>(
  ({ className, task, defaultCommandInfos, onChangeCommandTexts }, ref) => {
    const { deleteTask, updateTask } = useTasksOperator();

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

      const result = await updateTask({ id: task.id, isDone: true });
      if (result === "Error") {
        setIsChecked(false);
      }

      deleteTask({ id: task.id });
    };

    return (
      <>
        <TaskItemBase
          ref={ref}
          className={className}
          task={task}
          checked={isChecked}
          onChangeChecked={handleChangeChecked}
          onDeleteTask={deleteTask}
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
