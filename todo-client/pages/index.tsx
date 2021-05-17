import { NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { VStack } from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";

const Home: NextPage = () => {
  const todos = [...Array(100)];

  return (
    <>
      <Header mx="auto" bg="gray.900" />
      <AddTodoForm position="sticky" top="0" bg="gray.900" zIndex={1} />
      <VStack my={{ base: 6, lg: 12 }} spacing={6} align="center">
        {todos.map(() => (
          <TodoItem
            bg="gray.600"
            w={{ base: "95%", lg: "60%" }}
            borderRadius="10px"
          />
        ))}
      </VStack>
    </>
  );
};

export default Home;
