import { chakra } from "@chakra-ui/react";
import React from "react";
import { Done } from "../api/task";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";

export type DoneItemProps = Omit<CommonTaskItemProps, "task"> & { done: Done };

const Component: React.VFC<DoneItemProps> = ({
  className,
  done,
  onDeleteTask,
  onUpdateTodo,
  ...motionProps
}) => {
  return (
    <CommonTaskItem
      className={className}
      task={done}
      onDeleteTask={onDeleteTask}
      onUpdateTodo={onUpdateTodo}
      {...motionProps}
    />
  );
};

export const DoneItem = chakra(Component);
