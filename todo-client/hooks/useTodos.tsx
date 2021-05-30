/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useState } from "react";
import {
  CreateTodoRequest,
  DeleteMultipleTodosRequest,
  DeleteTodoRequest,
  Todo,
  TodoAPI,
  UpdateTodoRequest,
} from "../api/todo";

type UseTodosError = { title: string; description: string };

export type UseTodosResult = {
  todos: Todo[];
  dones: Todo[];
  error: UseTodosError | undefined;
  addTodo: (req: CreateTodoRequest) => Promise<void>;
  deleteTodo: (req: DeleteTodoRequest) => Promise<void>;
  deleteMultipleTodos: (req: DeleteMultipleTodosRequest) => Promise<void>;
  updateTodo: (rep: UpdateTodoRequest) => Promise<void>;
};

export const getDefaultUseTodosResult = (): UseTodosResult => ({
  todos: [],
  dones: [],
  error: undefined,
  addTodo: async () => {},
  deleteTodo: async () => {},
  deleteMultipleTodos: async () => {},
  updateTodo: async () => {},
});

export const useTodos = (todoAPI: TodoAPI): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);
  const [error, setError] = useState<UseTodosError>();

  const fetchAllTodos = useCallback(async () => {
    try {
      const todos = await todoAPI.getAll();
      setTodos(todos.filter((t) => !t.isDone).reverse());
      setDones(todos.filter((t) => t.isDone).reverse());
    } catch {
      setError({
        title: "Todoの読み込みに失敗",
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
          title: "Todoの作成に失敗",
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
      setTodos((todos) => todos.filter((t) => t.id !== req.id));
      setDones((todos) => todos.filter((t) => t.id !== req.id));
      try {
        await todoAPI.delete(req);
      } catch {
        setError({
          title: "Todoの削除に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTodos();
      }
    },
    [fetchAllTodos, todoAPI]
  );

  const deleteMultipleTodos = useCallback(
    async (req: DeleteMultipleTodosRequest) => {
      setTodos((todos) => todos.filter((t) => !req.ids.includes(t.id)));
      setDones((todos) => todos.filter((t) => !req.ids.includes(t.id)));
      try {
        await todoAPI.deleteMultiple(req);
      } catch {
        setError({
          title: "複数のTodoの削除に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTodos();
      }
    },
    [fetchAllTodos, todoAPI]
  );

  const checkTodo = useCallback(
    async (id: string) => {
      setTodos((todos) =>
        todos.map((todo) => {
          if (id === todo.id) {
            return { ...todo, isDone: true };
          }
          return todo;
        })
      );
      try {
        await todoAPI.update({ id, isDone: true });
      } catch {
        setError({
          title: "Todoの完了に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTodos();
      }
    },
    [fetchAllTodos, todoAPI]
  );

  const uncheckTodo = useCallback(
    async (id: string) => {
      setDones((todos) =>
        todos.map((todo) => {
          if (id === todo.id) {
            return { ...todo, isDone: false };
          }
          return todo;
        })
      );
      try {
        await todoAPI.update({ id, isDone: false });
      } catch {
        setError({
          title: "Todoの完了状態の取り消しに失敗",
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
      if (req.isDone) {
        await checkTodo(req.id);
      } else {
        await uncheckTodo(req.id);
      }
    },
    [checkTodo, uncheckTodo]
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
    deleteMultipleTodos,
    updateTodo,
  };
};
