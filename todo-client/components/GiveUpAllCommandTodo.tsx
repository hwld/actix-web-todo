import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import {
  DeleteMultipleTodosRequest,
  DeleteTodoRequest,
  Todo,
  UpdateTodoRequest,
} from "../api/todo";
import { GiveUpDialog } from "./GiveUpDialog";
import { TodoItem } from "./TodoItem";

type Props = {
  className?: string;
  todo: Todo;
  allTodos: Todo[];
  onDeleteTodo: (req: DeleteTodoRequest) => void;
  onDeleteMultiple: (req: DeleteMultipleTodosRequest) => void;
  onChangeChecked: (req: UpdateTodoRequest) => Promise<void>;
};

const Component: React.FC<Props> = ({
  className,
  todo,
  allTodos,
  onDeleteTodo,
  onDeleteMultiple,
  onChangeChecked,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = (req: UpdateTodoRequest) => {
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
      <TodoItem
        className={className}
        todo={todo}
        onDeleteTodo={onDeleteTodo}
        onChangeChecked={handleChangeChecked}
      />
      <GiveUpDialog
        isOpen={isOpen}
        onClose={onClose}
        onGiveUpAll={handleGiveUpAll}
      />
    </>
  );
};

export const GiveUpAllCommandTodo = chakra(Component);
