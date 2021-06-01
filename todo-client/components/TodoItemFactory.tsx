import { ChakraProps } from "@chakra-ui/react";
import React from "react";
import { DeleteMultipleTodosRequest, Todo } from "../api/todo";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { ChangeFontSizeCommandTodo } from "./ChangeFontSizeCommandTodo";
import { GiveUpAllCommandTodo } from "./GiveUpAllCommandTodo";
import { TodoItem, TodoItemProps } from "./TodoItem";

type Props = {
  todo: Todo;
  allTodos: Todo[];
  onDeleteTodo: TodoItemProps["onDeleteTodo"];
  onDeleteMultiple: (req: DeleteMultipleTodosRequest) => Promise<void>;
  onChangeChecked: TodoItemProps["onChangeChecked"];
  todoFontSize: number;
  setTodoFontSize: (fontSize: number) => void;
};

const Component: React.FC<Props> = ({
  todo,
  allTodos,
  onDeleteTodo,
  onDeleteMultiple,
  onChangeChecked,
  todoFontSize,
  setTodoFontSize,
}) => {
  const giveUpAllText = "`すべてを諦める`";
  const changeFontSizeText = "`文字の大きさを変える`";

  const todoStyles: ChakraProps = {
    w: "100%",
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
      transition: { duration: 0.2 },
    },
  };

  switch (todo.title) {
    case giveUpAllText: {
      return (
        <GiveUpAllCommandTodo
          key={todo.id}
          {...todoStyles}
          {...todoMotion}
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
        <ChangeFontSizeCommandTodo
          key={todo.id}
          {...todoStyles}
          {...todoMotion}
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
        <TodoItem
          key={todo.id}
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

export const TodoItemFactory = Component;
