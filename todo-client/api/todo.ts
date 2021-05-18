type Todo = {
  id: string;
  title: string;
  is_done: boolean;
};

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

const getAll = async () => {};

const create = async () => {};

const deleteTodo = async () => {};

const update = async () => {};

export const TodoAPI = {
  getAll,
  create,
  delete: deleteTodo,
  update,
};
