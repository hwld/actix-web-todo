import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { ComponentProps, SyntheticEvent, useMemo } from "react";
import { DeleteTodoRequest, Todo, UpdateTodoRequest } from "../api/todo";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { MotionBox } from "./MotionBox";
import { TodoCheckBox } from "./TodoCheckBox";

type Props = {
  className?: string;
  todo: Todo;
  onDeleteTodo: (req: DeleteTodoRequest) => Promise<void>;
  onChangeChecked: (req: UpdateTodoRequest) => Promise<void>;
} & MotionPropsWithChakra;

const Component: React.FC<Props> = ({
  className,
  todo,
  onDeleteTodo,
  onChangeChecked,
  motionTransition,
  ...motionProps
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
    <MotionBox {...motionProps} transition={motionTransition} w="100%" h="100%">
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
    </MotionBox>
  );
};

export const TodoItem = chakra<React.FC<Props>>(Component);
export type TodoItemProps = ComponentProps<typeof TodoItem>;
