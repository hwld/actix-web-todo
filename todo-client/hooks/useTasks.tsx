/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useState } from "react";
import {
  CreateTaskRequest,
  DeleteMultipleTasksRequest,
  DeleteTaskRequest,
  Done,
  TaskAPI,
  Todo,
  UpdateTaskRequest,
} from "../api/task";

export type UseTasksError = { title: string; description: string };

export type UseTasksResult = {
  todos: Todo[];
  dones: Done[];
  error: UseTasksError | undefined;
  addTask: (req: CreateTaskRequest) => Promise<void>;
  deleteTask: (req: DeleteTaskRequest) => Promise<void>;
  deleteMultipleTasks: (req: DeleteMultipleTasksRequest) => Promise<void>;
  updateTask: (rep: UpdateTaskRequest) => Promise<void>;
};

export const getDefaultUseTasksResult = (): UseTasksResult => ({
  todos: [],
  dones: [],
  error: undefined,
  addTask: async () => {},
  deleteTask: async () => {},
  deleteMultipleTasks: async () => {},
  updateTask: async () => {},
});

export const useTasks = (taskAPI: TaskAPI): UseTasksResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Done[]>([]);
  const [error, setError] = useState<UseTasksError>();

  const fetchAllTasks = useCallback(async () => {
    try {
      const tasks = await taskAPI.getAll();

      const tmp_todos: Todo[] = [];
      const tmp_dones: Done[] = [];
      tasks.forEach((task) => {
        if (task.isDone) {
          tmp_dones.push({ ...task, isDone: task.isDone });
        } else {
          tmp_todos.push({ ...task, isDone: task.isDone });
        }
      });
      setTodos(tmp_todos.reverse());
      setDones(tmp_dones.reverse());
    } catch {
      setError({
        title: "Taskの読み込みに失敗",
        description: "時間をおいて試してください",
      });
    }
  }, [taskAPI]);

  const addTask = useCallback(
    async (req: CreateTaskRequest) => {
      try {
        await taskAPI.create(req);
      } catch {
        setError({
          title: "Taskの作成に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTasks();
      }
    },
    [fetchAllTasks, taskAPI]
  );

  const deleteTask = useCallback(
    async (req: DeleteTaskRequest) => {
      setTodos((todos) => todos.filter((t) => t.id !== req.id));
      setDones((dones) => dones.filter((t) => t.id !== req.id));
      try {
        await taskAPI.delete(req);
      } catch {
        setError({
          title: "Taskの削除に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTasks();
      }
    },
    [fetchAllTasks, taskAPI]
  );

  const deleteMultipleTasks = useCallback(
    async (req: DeleteMultipleTasksRequest) => {
      setTodos((todos) => todos.filter((t) => !req.ids.includes(t.id)));
      setDones((dones) => dones.filter((t) => !req.ids.includes(t.id)));
      try {
        await taskAPI.deleteMultiple(req);
      } catch {
        setError({
          title: "複数のTaskの削除に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTasks();
      }
    },
    [fetchAllTasks, taskAPI]
  );

  const complete = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        return;
      }
      setTodos((todos) => todos.filter((t) => t.id !== id));
      setDones((dones) => [...dones, { ...todo, isDone: true }]);
      try {
        await taskAPI.update({ id, isDone: true });
      } catch {
        setError({
          title: "Taskの完了に失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTasks();
      }
    },
    [fetchAllTasks, taskAPI, todos]
  );

  const cancelCompletion = useCallback(
    async (id: string) => {
      const done = dones.find((t) => t.id === id);
      if (!done) {
        return;
      }
      setDones((dones) => dones.filter((d) => d.id !== id));
      setTodos((todos) => [...todos, { ...done, isDone: false }]);
      try {
        await taskAPI.update({ id, isDone: false });
      } catch {
        setError({
          title: "Taskの完了状態の取り消しに失敗",
          description: "時間をおいて試してください。",
        });
      } finally {
        fetchAllTasks();
      }
    },
    [dones, fetchAllTasks, taskAPI]
  );

  const updateTask = useCallback(
    async (req: UpdateTaskRequest) => {
      if (req.isDone) {
        await complete(req.id);
      } else {
        await cancelCompletion(req.id);
      }
    },
    [cancelCompletion, complete]
  );

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return {
    todos,
    dones,
    error,
    addTask,
    deleteTask,
    deleteMultipleTasks,
    updateTask,
  };
};
