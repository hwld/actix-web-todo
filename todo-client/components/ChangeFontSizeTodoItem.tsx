import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { Task } from "../api/task";
import {
  TaskFontSize,
  useTaskFontSize,
  useTaskFontSizeUpdate,
} from "../contexts/TaskFontSizeContext";
import { useTasksOperator } from "../contexts/TasksContext";
import { ChangeFontSizeDialog } from "./ChangeFontSizeDialog";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

// TaskItemBasePropsのonChangeCheckedはコンポーネントの内側で作成する。
export type ChangeFontSizeTodoItemProps = {
  className?: string;
  task: Task;
};

const Component = forwardRef<HTMLDivElement, ChangeFontSizeTodoItemProps>(
  ({ className, task }, ref) => {
    const taskFontSize = useTaskFontSize();
    const changeTaskFontSize = useTaskFontSizeUpdate();

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

    const handleChangeFontSize = async (fontSize: TaskFontSize) => {
      setIsChecked(true);
      changeTaskFontSize(fontSize);

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
        <ChangeFontSizeDialog
          isOpen={isOpen}
          onClose={onClose}
          defaultFontSize={taskFontSize}
          onChangeFontSize={handleChangeFontSize}
        />
      </>
    );
  }
);

export const ChangeFontSizeTodoItem = chakra(Component);
