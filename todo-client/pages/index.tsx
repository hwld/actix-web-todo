import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { VStack } from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";
import { Todo, TodoAPI } from "../api/todo";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getAllTodos() {
      const todos = await TodoAPI.getAll();
      setTodos(todos);
    }
    getAllTodos();
  }, []);

  return (
    <>
      <Header mx="auto" bg="gray.900" />
      <AddTodoForm position="sticky" top="0" bg="gray.900" zIndex={1} />
      <VStack my={{ base: 6, lg: 12 }} spacing={6} align="center">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            bg="gray.600"
            w={{ base: "95%", lg: "60%" }}
            borderRadius="10px"
            todo={todo.title}
          />
        ))}
      </VStack>
    </>
  );
};

export default Home;
