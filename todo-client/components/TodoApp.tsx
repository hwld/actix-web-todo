import { useToast, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { TodoAPI } from "../api/todo";
import { useTodos } from "../hooks/useTodos";
import { AddTodoForm } from "./AddTodoForm";
import { DoneBox } from "./DoneBox";
import { Header } from "./Header";
import { MotionBox } from "./MotionBox";
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
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: error.title,
        description: error.description,
        status: "error",
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <>
      <Header mx="auto" bg="gray.900" />
      <AddTodoForm
        position="sticky"
        top="0"
        bg="gray.900"
        zIndex={1}
        addTodo={addTodo}
      />

      <VStack
        mt={{ base: 6, lg: 12 }}
        mb={{ base: "150px", lg: 12 }}
        spacing={6}
        align="center"
        overflowX="clip"
      >
        <AnimatePresence>
          {todos.map((todo) => (
            <MotionBox
              key={todo.id}
              w={{ base: "95%", lg: "50%" }}
              layout
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              // checkBoxのアニメーションのあとに終了したい。現在checkBoxのアニメーションの時間に合わせて指定する。
              // どうにかしてcheckBoxのアニメーションの時間を外側から指定できたらいいんだけど・・・
              exit={{
                opacity: 0,
                transition: { duration: 0.2 },
              }}
            >
              <TodoItem
                bg="gray.600"
                borderRadius="10px"
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            </MotionBox>
          ))}
        </AnimatePresence>
      </VStack>
      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
        dones={dones}
        deleteTodo={deleteTodo}
        deleteMultipleTodo={deleteMultipleTodos}
        updateTodo={updateTodo}
      />
    </>
  );
};

export const TodoApp = Component;
