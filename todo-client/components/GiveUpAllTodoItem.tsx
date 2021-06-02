import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import {
  DeleteMultipleTodosRequest,
  Todo,
  UpdateTodoRequest,
} from "../api/todo";
import { GiveUpDialog } from "./GiveUpDialog";
import { CommonTodoItem, CommonTodoItemProps } from "./CommonTodoItem";

type Props = CommonTodoItemProps & {
  allTodos: Todo[];
  onDeleteMultiple: (req: DeleteMultipleTodosRequest) => void;
};

const Component: React.FC<Props> = ({
  className,
  todo,
  allTodos,
  onDeleteTodo,
  onDeleteMultiple,
  onChangeChecked,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = async (req: UpdateTodoRequest) => {
    if (req.isDone) {
      onOpen();
    }
  };

  const handleGiveUpAll = async () => {
    await onChangeChecked({ id: todo.id, isDone: true });

    onDeleteMultiple({ ids: allTodos.map((t) => t.id) });
  };

  return (
    <>
      <CommonTodoItem
        className={className}
        todo={todo}
        onDeleteTodo={onDeleteTodo}
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
