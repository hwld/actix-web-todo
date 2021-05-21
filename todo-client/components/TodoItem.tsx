import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
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
  const [isDone, setIsDone] = useState(todo.isDone);

  const handleItemClick = () => {
    setIsDone((isDone) => !isDone);
    updateTodo({ id: todo.id, isDone: !isDone });
  };

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDone = e.target.checked;
    setIsDone(isDone);
    updateTodo({ id: todo.id, isDone });
  };

  const handleClickCloseButton = (e: SyntheticEvent) => {
    e.stopPropagation();
    deleteTodo({ id: todo.id });
  };

  return (
    <Flex
      className={className}
      p={5}
      justify="space-between"
      align="center"
      onClick={handleItemClick}
    >
      <TodoCheckBox
        width="70px"
        height="70px"
        borderRadius="50%"
        iconWidth="30px"
        colorScheme="green"
        isChecked={isDone}
        onChange={handleChangeChecked}
      />
      <Text fontWeight="bold" px={5} w="full" wordBreak="break-all">
        {todo.title}
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
