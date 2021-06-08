import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { DeleteMultipleTasksRequest, Todo } from "../api/task";
import { GiveUpDialog } from "./GiveUpDialog";
import { UseTasksResult } from "../hooks/useTasks";
import { TaskItemBase, TaskItemBaseProps } from "./TaskItemBase";

export type GiveUpAllTodoItemProps = Omit<
  TaskItemBaseProps,
  "onChangeChecked"
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked: TaskItemBaseProps["onChangeChecked"] = async (
    isDone
  ) => {
    if (isDone) {
      onOpen();
    }
    return "NoError";
  };

  const handleGiveUpAll = async () => {
    await onUpdateTodo({ id: task.id, isDone: true });

    onDeleteMultiple({ ids: allTodos.map((t) => t.id) });
  };

  return (
    <>
      <TaskItemBase
        className={className}
        task={task}
        onDeleteTask={onDeleteTask}
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
