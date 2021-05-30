import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useMemo } from "react";
import { DeleteTodoRequest, Todo, UpdateTodoRequest } from "../api/todo";
import { TodoCheckBox } from "./TodoCheckBox";

export type TodoItemProps = {
  className?: string;
  todo: Todo;
  onDeleteTodo: (req: DeleteTodoRequest) => void;
  onChangeChecked: (req: UpdateTodoRequest) => void;
};

const Component: React.FC<TodoItemProps> = ({
  className,
  todo,
  onDeleteTodo,
  onChangeChecked,
}) => {
  const title = useMemo(() => {
    if (todo.isDone) {
      return <del>{todo.title}</del>;
    }
    return todo.title;
  }, [todo.isDone, todo.title]);

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeChecked({ id: todo.id, isDone: e.target.checked });
  };

  const handleClickCloseButton = (e: SyntheticEvent) => {
    e.stopPropagation();
    onDeleteTodo({ id: todo.id });
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
