import { ChakraProps, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { TodoAPI } from "../api/todo";
import { useTodos } from "../hooks/useTodos";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { AddTodoForm } from "./AddTodoForm";
import { ChangeFontSizeCommandTodo } from "./ChangeFontSizeCommandTodo";
import { DoneBox } from "./DoneBox";
import { ErrorBoundary } from "./ErrorBoundary";
import { GiveUpAllCommandTodo } from "./GiveUpAllCommandTodo";
import { Header } from "./Header";
import { TodoItem } from "./TodoItem";

type Props = {
  todoApi: TodoAPI;
};

const Component: React.FC<Props> = ({ todoApi }) => {
  const {
    todos,
    dones,
    error,
    addTodo,
    deleteTodo,
    deleteMultipleTodos,
    updateTodo,
  } = useTodos(todoApi);

  const [todoFontSize, setTodoFontSize] = useState(1);

  const giveUpAllText = '"すべてを諦める"';
  const changeFontSizeText = '"文字の大きさを変える"';

  return (
    <ErrorBoundary error={error}>
      <Header mx="auto" bg="gray.900" />
      <AddTodoForm
        position="sticky"
        top="0"
        bg="gray.900"
        zIndex={1}
        onAddTodo={addTodo}
      />

      <VStack
        mt={{ base: 6, lg: 12 }}
        mb={{ base: "150px", lg: 12 }}
        mx="auto"
        // アニメーションのためにwではなくpaddingを設定する
        px={{ base: "2.5%", lg: "25%" }}
        w="100%"
        spacing={6}
        align="center"
        overflowX="clip"
      >
        <AnimatePresence>
          {todos.map((todo) => {
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
            let todoElement: JSX.Element;
            switch (todo.title) {
              case giveUpAllText: {
                todoElement = (
                  <GiveUpAllCommandTodo
                    key={todo.id}
                    {...todoStyles}
                    {...todoMotion}
                    todo={todo}
                    allTodos={todos}
                    onDeleteTodo={deleteTodo}
                    onDeleteMultiple={deleteMultipleTodos}
                    onChangeChecked={updateTodo}
                  />
                );
                break;
              }
              case changeFontSizeText: {
                todoElement = (
                  <ChangeFontSizeCommandTodo
                    key={todo.id}
                    {...todoStyles}
                    {...todoMotion}
                    defaultFontSize={todoFontSize}
                    todo={todo}
                    onDeleteTodo={deleteTodo}
                    onChangeFontSize={setTodoFontSize}
                    onChangeChecked={updateTodo}
                  />
                );
                break;
              }
              default: {
                todoElement = (
                  <TodoItem
                    key={todo.id}
                    {...todoStyles}
                    {...todoMotion}
                    todo={todo}
                    onDeleteTodo={deleteTodo}
                    onChangeChecked={updateTodo}
                  />
                );
                break;
              }
            }

            return todoElement;
          })}
        </AnimatePresence>
      </VStack>

      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
        dones={dones}
        todoFontSize={`${todoFontSize}rem`}
        onDeleteTodo={deleteTodo}
        onDeleteMultipleTodo={deleteMultipleTodos}
        onUpdateTodo={updateTodo}
      />
    </ErrorBoundary>
  );
};

export const TodoApp = Component;
