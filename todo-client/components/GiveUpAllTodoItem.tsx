import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteMultipleTasksRequest, Todo } from "../api/task";
import { GiveUpDialog } from "./GiveUpDialog";
import { UseTasksResult } from "../hooks/useTasks";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type GiveUpAllTodoItemProps = Omit<
  TaskItemBaseProps,
  "onChangeChecked" | "checked"
> & {
  allTodos: Todo[];
  onDeleteMultiple: (req: DeleteMultipleTasksRequest) => void;
  onUpdateTodo: UseTasksResult["updateTask"];
};

const Component: React.VFC<GiveUpAllTodoItemProps> = ({
  className,
  task,
  allTodos,
  onDeleteTask,
  onDeleteMultiple,
  onUpdateTodo,
  ...props
}) => {
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

    const result = await onUpdateTodo({ id: task.id, isDone: true });
    if (result === "Error") {
      setIsChecked(false);
    }

    onDeleteMultiple({ ids: allTodos.map((t) => t.id) });
  };

  return (
    <>
      <TaskItemBase
        className={className}
        task={task}
        onDeleteTask={onDeleteTask}
        checked={isChecked}
        onChangeChecked={handleChangeChecked}
        {...props}
      />
      <GiveUpDialog
        isOpen={isOpen}
        onClose={onClose}
        onGiveUpAll={handleGiveUpAll}
      />
    </>
  );
};

export const GiveUpAllTodoItem = chakra(Component);
