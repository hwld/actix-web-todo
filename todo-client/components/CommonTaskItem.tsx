import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { UseTasksResult } from "../hooks/useTasks";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type CommonTaskItemProps = Omit<
  TaskItemBaseProps,
  "onChangeChecked" | "checked"
> & {
  onUpdateTodo: UseTasksResult["updateTask"];
};

const Component = forwardRef<HTMLDivElement, CommonTaskItemProps>(
  ({ className, task, onUpdateTodo, onDeleteTask }, ref) => {
    const [isChecked, setIsChecked] = useState(task.isDone);

    const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
      isDone
    ) => {
      setIsChecked(!isChecked);
      const result = await onUpdateTodo({ id: task.id, isDone });
      if (result === "Error") {
        setIsChecked(isChecked);
      }
    };

    return (
      <TaskItemBase
        ref={ref}
        className={className}
        task={task}
        checked={isChecked}
        onChangeChecked={handleChangeChecked}
        onDeleteTask={onDeleteTask}
      />
    );
  }
);

export const CommonTaskItem = chakra(Component);
