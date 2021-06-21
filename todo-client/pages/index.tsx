import { NextPage } from "next";
import React from "react";
import { AddTaskForm } from "../components/AddTaskForm";
import { DisplayCommandButton } from "../components/DisplayCommandButton";
import { DoneBox } from "../components/DoneBox";
import { ErrorAlert } from "../components/ErrorAlert";
import { Header } from "../components/Header";
import { TodoList } from "../components/TodoList";
import { useTasksState } from "../contexts/TasksContext";
import { useCommandInfos } from "../hooks/useCommandsInfo";

const Home: NextPage = () => {
  const { todos, error } = useTasksState();
  const {
    commandInfoList,
    changeCommandTexts,
    getCommandText,
  } = useCommandInfos();

  return (
    <>
      <ErrorAlert error={error} />

      <Header mx="auto" bg="gray.900" />
      <AddTaskForm position="sticky" top="0" bg="gray.900" zIndex={1} />

      <TodoList
        todos={todos}
        commandInfoList={commandInfoList}
        changeCommandTexts={changeCommandTexts}
        getCommandText={getCommandText}
      />

      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
      />

      <DisplayCommandButton
        commandInfos={commandInfoList}
        position="fixed"
        left={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
        boxSize="50px"
      />
    </>
  );
};

export default Home;
