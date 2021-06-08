import { chakra } from "@chakra-ui/react";
import React from "react";
import { UseTasksResult } from "../hooks/useTasks";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type CommonTaskItemProps = Omit<TaskItemBaseProps, "onChangeChecked"> & {
  onUpdateTodo: UseTasksResult["updateTask"];
};

const Component: React.VFC<CommonTaskItemProps> = ({
  className,
  task,
  onDeleteTask,
  onUpdateTodo,
  ...props
}) => {
  const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
    isDone
  ) => {
    return onUpdateTodo({ id: task.id, isDone });
  };

  return (
    <TaskItemBase
      className={className}
      task={task}
      onDeleteTask={onDeleteTask}
      onChangeChecked={handleChangeChecked}
      {...props}
    />
  );
};

export const CommonTaskItem = chakra(Component);
