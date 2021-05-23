const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

export type CreateTodoRequest = Pick<Todo, "title">;

export type DeleteTodoRequest = Pick<Todo, "id">;

export type UpdateTodoRequest = Pick<Todo, "id" | "isDone">;

const getAll = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_SERVER}/todos/`);

  if (!res.ok) {
    throw new Error("Todoを読み込むことができませんでした。");
  }

  const data = await res.json();

  return data as Todo[];
};

const create = async (req: CreateTodoRequest): Promise<Todo> => {
  const res = await fetch(`${API_SERVER}/todos/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("Todoを作成することができませんでした。");
  }

  const data = await res.json();
  return data as Todo;
};

const deleteTodo = async (req: DeleteTodoRequest): Promise<void> => {
  const res = await fetch(`${API_SERVER}/todos/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("Todoを削除することができませんでした。");
  }
};

const deleteAll = async (): Promise<void> => {
  const res = await fetch(`${API_SERVER}/todos/delete-all`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("すべてのTodoを削除することができませんでした。");
  }
};

const update = async (req: UpdateTodoRequest): Promise<void> => {
  const res = await fetch(`${API_SERVER}/todos/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error("Todoを更新することができませんでした。");
  }
};

export type TodoAPI = {
  getAll: typeof getAll;
  create: typeof create;
  delete: typeof deleteTodo;
  deleteAll: typeof deleteAll;
  update: typeof update;
};

export const todoAPI: TodoAPI = {
  getAll,
  create,
  delete: deleteTodo,
  deleteAll,
  update,
};
