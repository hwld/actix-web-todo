import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import React from "react";
import { AddTaskForm } from "../components/AddTaskForm";
import { DoneBox } from "../components/DoneBox";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Header } from "../components/Header";
import { TodoItem } from "../components/TodoItem";
import { useTasksState } from "../contexts/TasksContext";
import { useCommandInfos } from "../hooks/useCommandsInfo";
import { useTaskFontSize } from "../hooks/useTaskFontSize";

const Home: NextPage = () => {
  const { todos } = useTasksState();

  const [taskFontSize, setTaskFontSize] = useTaskFontSize();

  const {
    commandInfoList,
    changeCommandTexts,
    getCommandText,
  } = useCommandInfos();

  return (
    <ErrorBoundary>
      <Header mx="auto" bg="gray.900" />
      <AddTaskForm position="sticky" top="0" bg="gray.900" zIndex={1} />

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
              todoFontSize={taskFontSize}
              onChangeFontSize={setTaskFontSize}
              commandInfos={commandInfoList}
              onChangeCommandTexts={changeCommandTexts}
              getCommandText={getCommandText}
              layout
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
            />
          ))}
        </AnimatePresence>
      </VStack>

      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
        taskFontSize={taskFontSize}
      />
    </ErrorBoundary>
  );
};

export default Home;
