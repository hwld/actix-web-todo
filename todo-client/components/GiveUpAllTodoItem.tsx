import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { Task } from "../api/task";
import { useTasksOperator, useTasksState } from "../contexts/TasksContext";
import { GiveUpDialog } from "./GiveUpDialog";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type GiveUpAllTodoItemProps = { className?: string; task: Task };

const Component = forwardRef<HTMLDivElement, GiveUpAllTodoItemProps>(
  ({ className, task }, ref) => {
    const { todos: allTodos } = useTasksState();
    const { deleteMultipleTasks, updateTask } = useTasksOperator();

    const [isChecked, setIsChecked] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
      isDone
    ) => {
      if (isDone) {
        onOpen();
      }
    };

    const handleGiveUpAll = async () => {
      setIsChecked(true);

      const result = await updateTask({ id: task.id, isDone: true });
      if (result === "Error") {
        setIsChecked(false);
      }

      deleteMultipleTasks({ ids: allTodos.map((t) => t.id) });
    };

    return (
      <>
        <TaskItemBase
          ref={ref}
          className={className}
          task={task}
          checked={isChecked}
          onChangeChecked={handleChangeChecked}
        />
        <GiveUpDialog
          isOpen={isOpen}
          onClose={onClose}
          onGiveUpAll={handleGiveUpAll}
        />
      </>
    );
  }
);

export const GiveUpAllTodoItem = chakra(Component);
