import { NextPage } from "next";
import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { useToast, VStack } from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "../components/MotionBox";
import { DoneBox } from "../components/DoneBox";
import { useTodosContext } from "../context/TodosContext";

const Home: NextPage = () => {
  const {
    todos,
    dones,
    error,
    addTodo,
    deleteTodo,
    deleteMultipleTodos,
    updateTodo,
  } = useTodosContext();
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
              w={{ base: "100%", lg: "50%" }}
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

export default Home;
