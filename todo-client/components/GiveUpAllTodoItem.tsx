import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import {
  DeleteMultipleTasksRequest,
  Todo,
  UpdateTaskRequest,
} from "../api/task";
import { GiveUpDialog } from "./GiveUpDialog";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";

type Props = CommonTaskItemProps & {
  allTodos: Todo[];
  onDeleteMultiple: (req: DeleteMultipleTasksRequest) => void;
};

const Component: React.VFC<Props> = ({
  className,
  task,
  allTodos,
  onDeleteTask,
  onDeleteMultiple,
  onChangeChecked,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = async (req: UpdateTaskRequest) => {
    if (req.isDone) {
      onOpen();
    }
  };

  const handleGiveUpAll = async () => {
    await onChangeChecked({ id: task.id, isDone: true });

    onDeleteMultiple({ ids: allTodos.map((t) => t.id) });
  };

  return (
    <>
      <CommonTaskItem
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
