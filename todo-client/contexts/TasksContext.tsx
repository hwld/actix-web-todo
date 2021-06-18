import { createContext, useContext } from "react";
import {
  CreateTaskRequest,
  DeleteMultipleTasksRequest,
  DeleteTaskRequest,
  Done,
  taskAPI,
  Todo,
  UpdateTaskRequest,
} from "../api/task";
import { useTasks } from "../hooks/useTasks";

export type TasksError = { title: string; description: string };

// task操作関数はエラー時にerrorオブジェクトを設定するが、呼び出した側でハンドリングしやすいようにErrorの有無も返す
export type ErrorType = "Error" | "NoError";

export type TasksState = {
  todos: Todo[];
  dones: Done[];
  error: TasksError | undefined;
};

export type TasksOperator = {
  addTask: (req: CreateTaskRequest) => Promise<ErrorType>;
  deleteTask: (req: DeleteTaskRequest) => Promise<ErrorType>;
  deleteMultipleTasks: (req: DeleteMultipleTasksRequest) => Promise<ErrorType>;
  updateTask: (rep: UpdateTaskRequest) => Promise<ErrorType>;
};

const noop = async () => "Error" as const;

export const TasksStateContext = createContext<TasksState>({
  todos: [],
  dones: [],
  error: undefined,
});

export const TasksOperatorContext = createContext<TasksOperator>({
  addTask: noop,
  deleteTask: noop,
  deleteMultipleTasks: noop,
  updateTask: noop,
});

export const TasksContextProvider: React.FC = ({ children }) => {
  const [tasksState, tasksOperator] = useTasks(taskAPI);

  return (
    <TasksStateContext.Provider value={tasksState}>
      <TasksOperatorContext.Provider value={tasksOperator}>
        {children}
      </TasksOperatorContext.Provider>
    </TasksStateContext.Provider>
  );
};

export const useTasksState = (): TasksState => {
  return useContext(TasksStateContext);
};

export const useTasksOperator = (): TasksOperator => {
  return useContext(TasksOperatorContext);
};
