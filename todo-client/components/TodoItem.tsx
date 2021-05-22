import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useMemo } from "react";
import { DeleteTodoRequest, Todo, UpdateTodoRequest } from "../api/todo";
import { TodoCheckBox } from "./TodoCheckBox";

type Props = {
  className?: string;
  todo: Todo;
  deleteTodo: (req: DeleteTodoRequest) => void;
  updateTodo: (req: UpdateTodoRequest) => void;
};

const Component: React.FC<Props> = ({
  className,
  todo,
  deleteTodo,
  updateTodo,
}) => {
  const title = useMemo(() => {
    if (todo.isDone) {
      return <del>{todo.title}</del>;
    }
    return todo.title;
  }, [todo.isDone]);

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ id: todo.id, isDone: e.target.checked });
  };

  const handleClickCloseButton = (e: SyntheticEvent) => {
    e.stopPropagation();
    deleteTodo({ id: todo.id });
  };

  return (
    <Flex className={className} p={5} justify="space-between" align="center">
      <TodoCheckBox
        width="70px"
        height="70px"
        borderRadius="50%"
        iconWidth="30px"
        isChecked={todo.isDone}
        onChange={handleChangeChecked}
      />
      <Text fontWeight="bold" px={5} w="full" wordBreak="break-all">
        {title}
      </Text>
      <CloseButton
        color="red.500"
        onClick={handleClickCloseButton}
        alignSelf="flex-start"
      />
    </Flex>
  );
};

export const TodoItem = chakra(Component);
