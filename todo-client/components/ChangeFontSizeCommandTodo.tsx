import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { DeleteTodoRequest, Todo, UpdateTodoRequest } from "../api/todo";
import { ChangeFontSizeDialog } from "./ChangeFontSizeDialog";
import { TodoItem } from "./TodoItem";

type Props = {
  className?: string;
  todo: Todo;
  defaultFontSize: number;
  onDeleteTodo: (req: DeleteTodoRequest) => void;
  onChangeFontSize: (fontSize: number) => void;
  onChangeChecked: (req: UpdateTodoRequest) => Promise<void>;
};

const Component: React.FC<Props> = ({
  className,
  todo,
  defaultFontSize,
  onDeleteTodo,
  onChangeFontSize,
  onChangeChecked,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = (req: UpdateTodoRequest) => {
    if (req.isDone) {
      onOpen();
    }
  };

  const handleChangeFontSize = async (fontSize: number) => {
    onChangeFontSize(fontSize);

    await onChangeChecked({ id: todo.id, isDone: true });
    onDeleteTodo({ id: todo.id });
  };

  return (
    <>
      <TodoItem
        className={className}
        todo={todo}
        onDeleteTodo={onDeleteTodo}
        onChangeChecked={handleChangeChecked}
      />
      <ChangeFontSizeDialog
        isOpen={isOpen}
        onClose={onClose}
        defaultFontSize={defaultFontSize}
        onChangeFontSize={handleChangeFontSize}
      />
    </>
  );
};

export const ChangeFontSizeCommandTodo = chakra(Component);
