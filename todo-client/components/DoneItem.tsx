import { chakra } from "@chakra-ui/react";
import React from "react";
import { Done } from "../api/task";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";

export type DoneItemProps = Omit<CommonTaskItemProps, "task"> & { done: Done };

const Component: React.FC<DoneItemProps> = ({ className, ...others }) => {
  const { done, onDeleteTask, onChangeChecked, ...motionProps } = others;

  return (
    <CommonTaskItem
      className={className}
      task={done}
      onDeleteTask={onDeleteTask}
      onChangeChecked={onChangeChecked}
      {...motionProps}
    />
  );
};

export const DoneItem = chakra(Component);
