import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { TaskAPI } from "../api/task";
import { useCommandTexts } from "../hooks/useCommandTexts";
import { useTaskFontSize } from "../hooks/useTaskFontSize";
import { useTasks } from "../hooks/useTasks";
import { AddTaskForm } from "./AddTaskForm";
import { DoneBox } from "./DoneBox";
import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "./Header";
import { TodoItem } from "./TodoItem";

type Props = {
  taskApi: TaskAPI;
};

const Component: React.VFC<Props> = ({ taskApi }) => {
  const {
    todos,
    dones,
    error,
    addTask,
    deleteTask,
    deleteMultipleTasks,
    updateTask,
  } = useTasks(taskApi);

  const [taskFontSize, setTaskFontSize] = useTaskFontSize();
  const [commandText, setCommandText] = useCommandTexts();

  return (
    <ErrorBoundary error={error}>
      <Header mx="auto" bg="gray.900" />
      <AddTaskForm
        position="sticky"
        top="0"
        bg="gray.900"
        zIndex={1}
        onAddTask={addTask}
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
              commandTexts={commandText}
              onDeleteTask={deleteTask}
              onUpdateTodo={updateTask}
              onDeleteMultiple={deleteMultipleTasks}
              todoFontSize={taskFontSize}
              onChangeFontSize={setTaskFontSize}
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
        dones={dones}
        allTodos={todos}
        onDeleteDone={deleteTask}
        onDeleteMultipleDone={deleteMultipleTasks}
        onUpdateDone={updateTask}
        taskFontSize={taskFontSize}
        setTaskFontSize={setTaskFontSize}
      />
    </ErrorBoundary>
  );
};

export const TaskApp = Component;
