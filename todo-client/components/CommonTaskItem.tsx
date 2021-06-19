import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { Task } from "../api/task";
import { useTasksOperator } from "../contexts/TasksContext";
import { TaskItemBase } from "./TaskItemBase";

export type CommonTaskItemProps = {
  className?: string;
  task: Task;
};

const Component = forwardRef<HTMLDivElement, CommonTaskItemProps>(
  ({ className, task }, ref) => {
    const { updateTask, deleteTask } = useTasksOperator();

    const [isChecked, setIsChecked] = useState(task.isDone);

    const handleChangeChecked = async (isDone: boolean) => {
      setIsChecked(!isChecked);
      const result = await updateTask({ id: task.id, isDone });
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
        onDeleteTask={deleteTask}
      />
    );
  }
);

export const CommonTaskItem = chakra(Component);
