const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};
export type Todo = Extract<
  {
    id: string;
    title: string;
    isDone: false;
  },
  Task
>;
export type Done = Extract<
  {
    id: string;
    title: string;
    isDone: true;
  },
  Task
>;

export type CreateTaskRequest = Pick<Task, "title">;
export type DeleteTaskRequest = Pick<Task, "id">;
export type DeleteMultipleTasksRequest = { ids: Task["id"][] };
export type UpdateTaskRequest = Pick<Task, "id" | "isDone">;

const getAll = async (): Promise<Task[]> => {
  const res = await fetch(`${API_SERVER}/todos`);

  if (!res.ok) {
    throw new Error("Taskを読み込むことができませんでした。");
  }

  const data = await res.json();

  return data as Task[];
};

const create = async (req: CreateTaskRequest): Promise<Task> => {
  const res = await fetch(`${API_SERVER}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("Taskを作成することができませんでした。");
  }

  const data = await res.json();
  return data as Task;
};

const deleteTask = async (req: DeleteTaskRequest): Promise<void> => {
  const res = await fetch(`${API_SERVER}/todos/${req.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Taskを削除することができませんでした。");
  }
};

const deleteMultiple = async (
  req: DeleteMultipleTasksRequest
): Promise<void> => {
  const res = await fetch(`${API_SERVER}/todos/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("複数のTasksを削除することができませんでした。");
  }
};

const deleteAll = async (): Promise<void> => {
  const res = await fetch(`${API_SERVER}/todos/delete-all`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("すべてのTaskを削除することができませんでした。");
  }
};

const update = async (r: UpdateTaskRequest): Promise<void> => {
  const { id, ...req } = r;

  const res = await fetch(`${API_SERVER}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("Taskを更新することができませんでした。");
  }
};

export const taskAPI = {
  getAll,
  create,
  delete: deleteTask,
  deleteMultiple,
  deleteAll,
  update,
};

export type TaskAPI = typeof taskAPI;
