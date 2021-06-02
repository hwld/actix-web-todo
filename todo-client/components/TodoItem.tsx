import { chakra, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { DeleteMultipleTodosRequest, Todo } from "../api/todo";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { ChangeFontSizeTodoItem } from "./ChangeFontSizeTodoItem";
import { GiveUpAllTodoItem } from "./GiveUpAllTodoItem";
import { CommonTodoItem, CommonTodoItemProps } from "./CommonTodoItem";

type Props = {
  className?: string;
  todo: Todo;
  allTodos: Todo[];
  onDeleteTodo: CommonTodoItemProps["onDeleteTodo"];
  onDeleteMultiple: (req: DeleteMultipleTodosRequest) => Promise<void>;
  onChangeChecked: CommonTodoItemProps["onChangeChecked"];
  todoFontSize: number;
  setTodoFontSize: (fontSize: number) => void;
} & MotionPropsWithChakra;

const Component: React.VFC<Props> = ({
  className,
  todo,
  allTodos,
  onDeleteTodo,
  onDeleteMultiple,
  onChangeChecked,
  todoFontSize,
  setTodoFontSize,
  ...motionProps
}) => {
  const giveUpAllText = "`すべてを諦める`";
  const changeFontSizeText = "`文字の大きさを変える`";

  const todoStyles: ChakraProps = {
    bg: "gray.600",
    borderRadius: "10px",
    fontSize: `${todoFontSize}rem`,
  };
  const todoMotion: MotionPropsWithChakra = {
    layout: true,
    initial: { x: -300 },
    animate: { x: 0 },
    // checkBoxのアニメーションのあとに終了したい。現在checkBoxのアニメーションの時間に合わせて指定する。
    // どうにかしてcheckBoxのアニメーションの時間を外側から指定できたらいいんだけど・・・
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    ...motionProps,
  };

  switch (todo.title) {
    case giveUpAllText: {
      return (
        <GiveUpAllTodoItem
          key={todo.id}
          {...todoStyles}
          {...todoMotion}
          className={className}
          todo={todo}
          allTodos={allTodos}
          onDeleteTodo={onDeleteTodo}
          onDeleteMultiple={onDeleteMultiple}
          onChangeChecked={onChangeChecked}
        />
      );
    }
    case changeFontSizeText: {
      return (
        <ChangeFontSizeTodoItem
          key={todo.id}
          {...todoStyles}
          {...todoMotion}
          className={className}
          defaultFontSize={todoFontSize}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onChangeFontSize={setTodoFontSize}
          onChangeChecked={onChangeChecked}
        />
      );
    }
    default: {
      return (
        <CommonTodoItem
          key={todo.id}
          className={className}
          {...todoStyles}
          {...todoMotion}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onChangeChecked={onChangeChecked}
        />
      );
    }
  }
};

export const TodoItem = chakra(Component);
