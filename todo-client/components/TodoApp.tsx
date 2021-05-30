import { useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TodoAPI, UpdateTodoRequest } from "../api/todo";
import { useTodos } from "../hooks/useTodos";
import { AddTodoForm } from "./AddTodoForm";
import { ChangeFontSizeDialog } from "./ChangeFontSizeDialog";
import { DoneBox } from "./DoneBox";
import { GiveUpDialog } from "./GiveUpDialog";
import { Header } from "./Header";
import { MotionBox } from "./MotionBox";
import { TodoItem } from "./TodoItem";

type Props = {
  todoApi: TodoAPI;
};

const Component: React.FC<Props> = ({ todoApi }) => {
  const {
    todos,
    dones,
    error,
    addTodo,
    deleteTodo,
    deleteMultipleTodos,
    updateTodo,
  } = useTodos(todoApi);
  const toast = useToast();
  const [todoFontSize, setTodoFontSize] = useState(1);

  const giveUpText = '"すべてを諦める"';
  const {
    isOpen: isOpenGiveUpDialog,
    onOpen: onOpenGiveUpDialog,
    onClose: onCloseGiveUpDialog,
  } = useDisclosure();
  const handleGiveUpAll = async () => {
    const commandTodoId = todos.find((t) => t.title === giveUpText)?.id;
    if (commandTodoId) {
      await updateTodo({ id: commandTodoId, isDone: true });
    }

    deleteMultipleTodos({ ids: todos.map((t) => t.id) });
  };

  const changeFontSizeText = '"文字の大きさを変える"';
  const {
    isOpen: isOpenChangeFontSizeDialog,
    onOpen: onOpenChangeFontSizeDialog,
    onClose: onCloseChangeFontSizeDialog,
  } = useDisclosure();
  const handleChangeFontSize = async (fontSize: number) => {
    setTodoFontSize(fontSize);

    const commandTodoId = todos.find((t) => t.title === changeFontSizeText)?.id;
    if (commandTodoId) {
      await updateTodo({ id: commandTodoId, isDone: true });
      deleteTodo({ id: commandTodoId });
    }
  };

  const handleChangeChecked = (req: UpdateTodoRequest) => {
    // isDoneがfalseのタスク(todos)のみ探す
    const title = todos.find((t) => t.id === req.id)?.title;

    if (title && req.isDone) {
      switch (title) {
        case giveUpText:
          onOpenGiveUpDialog();
          return;
        case changeFontSizeText:
          onOpenChangeFontSizeDialog();
          return;
      }
    }
    updateTodo(req);
  };

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
        onAddTodo={addTodo}
      />

      <VStack
        mt={{ base: 6, lg: 12 }}
        mb={{ base: "150px", lg: 12 }}
        spacing={6}
        align="center"
        overflowX="clip"
      >
        <AnimatePresence>
          {todos.map((todo) => {
            return (
              <MotionBox
                key={todo.id}
                w={{ base: "95%", lg: "50%" }}
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
                  fontSize={`${todoFontSize}rem`}
                  todo={todo}
                  onDeleteTodo={deleteTodo}
                  onChangeChecked={handleChangeChecked}
                />
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </VStack>

      <DoneBox
        position="fixed"
        right={{ base: "20px", lg: "80px" }}
        bottom={{ base: "20px", lg: "50px" }}
        dones={dones}
        todoFontSize={`${todoFontSize}rem`}
        onDeleteTodo={deleteTodo}
        onDeleteMultipleTodo={deleteMultipleTodos}
        onUpdateTodo={updateTodo}
      />

      <GiveUpDialog
        isOpen={isOpenGiveUpDialog}
        onClose={onCloseGiveUpDialog}
        onGiveUpAll={handleGiveUpAll}
      />

      <ChangeFontSizeDialog
        isOpen={isOpenChangeFontSizeDialog}
        onClose={onCloseChangeFontSizeDialog}
        defaultFontSize={todoFontSize}
        onChangeFontSize={handleChangeFontSize}
      />
    </>
  );
};

export const TodoApp = Component;
