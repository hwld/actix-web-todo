import { useToast } from "@chakra-ui/toast";
import { useCallback, useEffect, useState } from "react";
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  Todo,
  TodoAPI,
  UpdateTodoRequest,
} from "../api/todo";

type UseTodosResult = {
  todos: Todo[];
  dones: Todo[];
  addTodo: (req: CreateTodoRequest) => Promise<void>;
  deleteTodo: (req: DeleteTodoRequest) => Promise<void>;
  updateTodo: (rep: UpdateTodoRequest) => Promise<void>;
};

export const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);
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
  }, [toast]);

  const addTodo = useCallback(
    async (req: CreateTodoRequest) => {
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
    },
    [fetchAllTodos, toast]
  );

  const deleteTodo = useCallback(
    async (req: DeleteTodoRequest) => {
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
    },
    [fetchAllTodos, toast]
  );

  const updateTodo = useCallback(
    async (req: UpdateTodoRequest) => {
      try {
        if (req.isDone) {
          // isDoneをtrueに変更するときには、状態の変化を表示するために先ずはtodosに追加する。
          setTodos((todos) =>
            todos.map((todo) => {
              if (req.id === todo.id) {
                return { ...todo, isDone: req.isDone };
              }
              return todo;
            })
          );
        } else {
          // isDoneをfalseに変更するときには、状態の変化を表示するために先ずはdonesに追加する。
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
    },
    [fetchAllTodos, toast]
  );

  useEffect(() => {
    fetchAllTodos();
  }, [fetchAllTodos]);

  return { todos, dones, addTodo, deleteTodo, updateTodo };
};
