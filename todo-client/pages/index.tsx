import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { useToast, VStack } from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  Todo,
  TodoAPI,
  UpdateTodoRequest,
} from "../api/todo";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "../components/MotionBox";
import { DoneBox } from "../components/DoneBox";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);
  const toast = useToast();

  const fetchAllTodos = useCallback(async () => {
    try {
      const todos = await TodoAPI.getAll();
      setTodos(todos.filter((t) => !t.isDone).reverse());
      setDones(todos.filter((t) => t.isDone).reverse());
    } catch {
      toast({
        title: "Todo読み込み失敗",
        description: "時間をおいて試してください。",
        isClosable: true,
        status: "error",
      });
    }
  }, []);

  const addTodo = async (req: CreateTodoRequest) => {
    try {
      await TodoAPI.create(req);
      fetchAllTodos();
    } catch {
      toast({
        title: "Todo作成失敗",
        description: "時間をおいて試してください。",
        isClosable: true,
        status: "error",
      });
    }
  };

  const deleteTodo = async (req: DeleteTodoRequest) => {
    try {
      setTodos((todos) => todos.filter((t) => t.id !== req.id));
      setDones((todos) => todos.filter((t) => t.id !== req.id));
      await TodoAPI.delete(req);
      fetchAllTodos();
    } catch {
      toast({
        title: "Todo削除失敗",
        description: "時間をおいて試してください。",
        isClosable: true,
        status: "error",
      });
    }
  };

  const updateTodo = async (req: UpdateTodoRequest) => {
    try {
      if (req.isDone) {
        // isDoneをtrueに変更するときには、状態の変化を表示するためにtodosに追加する。
        setTodos((todos) =>
          todos.map((todo) => {
            if (req.id === todo.id) {
              return { ...todo, isDone: req.isDone };
            }
            return todo;
          })
        );
      } else {
        // isDoneをfalseに変更するときには、状態の変化を表示するためにdonesに追加する。
        setDones((dones) =>
          dones.map((done) => {
            if (req.id === done.id) {
              return { ...done, isDone: req.isDone };
            }
            return done;
          })
        );
      }
      await TodoAPI.update(req);
      fetchAllTodos();
    } catch {
      toast({
        title: "Todo更新失敗",
        description: "時間をおいて試してください。",
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

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
