import { VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { Todo } from "../api/task";
import { UseCommandInfosResult } from "../hooks/useCommandsInfo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  commandInfoList: UseCommandInfosResult["commandInfoList"];
  changeCommandTexts: UseCommandInfosResult["changeCommandTexts"];
  getCommandText: UseCommandInfosResult["getCommandText"];
};

const Component: React.FC<Props> = ({
  todos,
  commandInfoList,
  changeCommandTexts,
  getCommandText,
}) => {
  return (
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
  );
};

export const TodoList = Component;
