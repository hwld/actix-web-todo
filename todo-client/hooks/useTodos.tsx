import { useCallback, useEffect, useState } from "react";
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  Todo,
  TodoAPI,
  UpdateTodoRequest,
} from "../api/todo";

type useTodosError = { title: string; description: string };

type UseTodosResult = {
  todos: Todo[];
  dones: Todo[];
  error: useTodosError | undefined;
  addTodo: (req: CreateTodoRequest) => Promise<void>;
  deleteTodo: (req: DeleteTodoRequest) => Promise<void>;
  updateTodo: (rep: UpdateTodoRequest) => Promise<void>;
};

export const useTodos = (todoAPI: TodoAPI): UseTodosResult => {
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);
  const [error, setError] = useState<useTodosError>();

  const fetchAllTodos = useCallback(async () => {
    try {
      const todos = await todoAPI.getAll();
      setTodos(todos.filter((t) => !t.isDone).reverse());
      setDones(todos.filter((t) => t.isDone).reverse());
    } catch {
      setError({
        title: "Todo読み込み失敗",
        description: "時間をおいて試してください",
      });
    }
  }, [todoAPI]);

  const addTodo = useCallback(
    async (req: CreateTodoRequest) => {
      try {
        await todoAPI.create(req);
      } catch {
        setError({
          title: "Todo作成失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTodos();
      }
    },
    [fetchAllTodos, todoAPI]
  );

  const deleteTodo = useCallback(
    async (req: DeleteTodoRequest) => {
      try {
        setTodos((todos) => todos.filter((t) => t.id !== req.id));
        setDones((todos) => todos.filter((t) => t.id !== req.id));
        await todoAPI.delete(req);
      } catch {
        setError({
          title: "Todo削除失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTodos();
      }
    },
    [fetchAllTodos, todoAPI]
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
        await todoAPI.update(req);
      } catch {
        setError({
          title: "Todo更新失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        // ここでisDoneがfalseであればtodosに、trueであればdonesに追加される
        fetchAllTodos();
      }
    },
    [fetchAllTodos, todoAPI]
  );

  useEffect(() => {
    fetchAllTodos();
  }, [fetchAllTodos]);

  return {
    todos,
    dones,
    error,
    addTodo,
    deleteTodo,
    updateTodo,
  };
};
