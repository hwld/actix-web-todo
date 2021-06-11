import { chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import { UseTasksResult } from "../hooks/useTasks";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type CommonTaskItemProps = Omit<
  TaskItemBaseProps,
  "onChangeChecked" | "checked"
> & {
  onUpdateTodo: UseTasksResult["updateTask"];
};

const Component: React.VFC<CommonTaskItemProps> = ({
  className,
  task,
  onDeleteTask,
  onUpdateTodo,
  ...props
}) => {
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
      className={className}
      task={task}
      onDeleteTask={onDeleteTask}
      checked={isChecked}
      onChangeChecked={handleChangeChecked}
      {...props}
    />
  );
};

export const CommonTaskItem = chakra(Component);
