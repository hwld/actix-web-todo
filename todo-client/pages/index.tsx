import { NextPage } from "next";
import React from "react";
import { AddTaskForm } from "../components/AddTaskForm";
import { DoneBox } from "../components/DoneBox";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Header } from "../components/Header";
import { TodoList } from "../components/TodoList";
import { useTasksState } from "../contexts/TasksContext";

const Home: NextPage = () => {
  const { todos } = useTasksState();

  return (
    <ErrorBoundary>
      <Header mx="auto" bg="gray.900" />
      <AddTaskForm position="sticky" top="0" bg="gray.900" zIndex={1} />

      <TodoList todos={todos} />

      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
      />
    </ErrorBoundary>
  );
};

export default Home;
