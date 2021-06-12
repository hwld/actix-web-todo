import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { Done } from "../api/task";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";

export type DoneItemProps = Omit<CommonTaskItemProps, "task"> & { done: Done };

const Component = forwardRef<HTMLDivElement, DoneItemProps>(
  ({ className, done, onDeleteTask, onUpdateTodo }, ref) => {
    return (
      <CommonTaskItem
        ref={ref}
        className={className}
        task={done}
        onDeleteTask={onDeleteTask}
        onUpdateTodo={onUpdateTodo}
      />
    );
  }
);

export const DoneItem = chakra(motion(Component));
