import { NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { VStack } from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "../components/MotionBox";
import { DoneBox } from "../components/DoneBox";
import { useTodos } from "../hooks/useTodos";

const Home: NextPage = () => {
  const { todos, dones, addTodo, deleteTodo, updateTodo } = useTodos();

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
        my={{ base: 6, lg: 12 }}
        spacing={6}
        align="center"
        h="100%"
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
      <DoneBox dones={dones} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </>
  );
};

export default Home;
