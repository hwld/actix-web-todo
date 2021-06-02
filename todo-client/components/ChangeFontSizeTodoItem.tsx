import { useDisclosure } from "@chakra-ui/hooks";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { UpdateTodoRequest } from "../api/todo";
import { ChangeFontSizeDialog } from "./ChangeFontSizeDialog";
import { CommonTodoItem, CommonTodoItemProps } from "./CommonTodoItem";

type Props = CommonTodoItemProps & {
  className?: string;
  defaultFontSize: number;
  onChangeFontSize: (fontSize: number) => void;
};

const Component: React.VFC<Props> = ({
  className,
  todo,
  onDeleteTodo,
  onChangeChecked,
  defaultFontSize,
  onChangeFontSize,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeChecked = async (req: UpdateTodoRequest) => {
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
      <CommonTodoItem
        className={className}
        todo={todo}
        onDeleteTodo={onDeleteTodo}
        onChangeChecked={handleChangeChecked}
        {...props}
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

export const ChangeFontSizeTodoItem = chakra(Component);
