import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { TodoAPI } from "../api/todo";
import { useTodos } from "../hooks/useTodos";
import { AddTodoForm } from "./AddTodoForm";
import { DoneBox } from "./DoneBox";
import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "./Header";
import { TodoItem } from "./TodoItem";

type Props = {
  todoApi: TodoAPI;
};

const Component: React.VFC<Props> = ({ todoApi }) => {
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
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              allTodos={todos}
              onDeleteTodo={deleteTodo}
              onDeleteMultiple={deleteMultipleTodos}
              onChangeChecked={updateTodo}
              todoFontSize={todoFontSize}
              setTodoFontSize={setTodoFontSize}
            />
          ))}
        </AnimatePresence>
      </VStack>

      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
        dones={dones}
        allTodos={todos}
        onDeleteTodo={deleteTodo}
        onDeleteMultipleTodo={deleteMultipleTodos}
        onUpdateTodo={updateTodo}
        todoFontSize={todoFontSize}
        setTodoFontSize={setTodoFontSize}
      />
    </ErrorBoundary>
  );
};

export const TodoApp = Component;
