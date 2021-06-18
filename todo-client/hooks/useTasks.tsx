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
import {
  ErrorType,
  TasksError,
  TasksOperator,
  TasksState,
} from "../contexts/TasksContext";

export const useTasks = (taskAPI: TaskAPI): [TasksState, TasksOperator] => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Done[]>([]);
  const [error, setError] = useState<TasksError>();

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
    async (req: CreateTaskRequest): Promise<ErrorType> => {
      try {
        await taskAPI.create(req);
        return "NoError";
      } catch {
        setError({
          title: "Taskの作成に失敗",
          description: "時間をおいて試してください。",
        });
        return "Error";
      } finally {
        fetchAllTasks();
      }
    },
    [fetchAllTasks, taskAPI]
  );

  const deleteTask = useCallback(
    async (req: DeleteTaskRequest): Promise<ErrorType> => {
      setTodos((todos) => todos.filter((t) => t.id !== req.id));
      setDones((dones) => dones.filter((t) => t.id !== req.id));
      try {
        await taskAPI.delete(req);
        return "NoError";
      } catch {
        setError({
          title: "Taskの削除に失敗",
          description: "時間をおいて試してください。",
        });
        return "Error";
      } finally {
        fetchAllTasks();
      }
    },
    [fetchAllTasks, taskAPI]
  );

  const deleteMultipleTasks = useCallback(
    async (req: DeleteMultipleTasksRequest): Promise<ErrorType> => {
      setTodos((todos) => todos.filter((t) => !req.ids.includes(t.id)));
      setDones((dones) => dones.filter((t) => !req.ids.includes(t.id)));
      try {
        await taskAPI.deleteMultiple(req);
        return "NoError";
      } catch {
        setError({
          title: "複数のTaskの削除に失敗",
          description: "時間をおいて試してください。",
        });
        return "Error";
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
      await taskAPI.update({ id, isDone: true });
    },
    [taskAPI, todos]
  );

  const cancelCompletion = useCallback(
    async (id: string) => {
      const done = dones.find((t) => t.id === id);
      if (!done) {
        return;
      }
      setDones((dones) => dones.filter((d) => d.id !== id));
      setTodos((todos) => [...todos, { ...done, isDone: false }]);
      await taskAPI.update({ id, isDone: false });
    },
    [dones, taskAPI]
  );

  const updateTask = useCallback(
    async (req: UpdateTaskRequest): Promise<ErrorType> => {
      try {
        if (req.isDone) {
          await complete(req.id);
        } else {
          await cancelCompletion(req.id);
        }
        return "NoError";
      } catch {
        setError({
          title: "Taskの更新に失敗",
          description: "時間をおいて試してください。",
        });
        return "Error";
      } finally {
        fetchAllTasks();
      }
    },
    [cancelCompletion, complete, fetchAllTasks]
  );

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return [
    { todos, dones, error },
    { addTask, deleteTask, deleteMultipleTasks, updateTask },
  ];
};
