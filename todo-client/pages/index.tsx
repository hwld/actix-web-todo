import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { VStack } from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  Todo,
  TodoAPI,
  UpdateTodoRequest,
} from "../api/todo";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getAllTodos() {
      const todos = await TodoAPI.getAll();
      setTodos(todos);
    }
    getAllTodos();
  }, []);

  const addTodo = async (req: CreateTodoRequest) => {
    await TodoAPI.create(req);
    const todos = await TodoAPI.getAll();
    setTodos(todos);
  };

  const deleteTodo = async (req: DeleteTodoRequest) => {
    await TodoAPI.delete(req);
    const todos = await TodoAPI.getAll();
    setTodos(todos);
  };

  const updateTodo = async (req: UpdateTodoRequest) => {
    await TodoAPI.update(req);
  };

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
      <VStack my={{ base: 6, lg: 12 }} spacing={6} align="center">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            bg="gray.600"
            w={{ base: "95%", lg: "60%" }}
            borderRadius="10px"
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </VStack>
    </>
  );
};

export default Home;
