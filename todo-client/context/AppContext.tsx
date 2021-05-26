import { todoAPI } from "../api/todo";
import { useTodos } from "../hooks/useTodos";
import { TodosContextProvider } from "./TodosContext";

export const AppContextProvider: React.FC = ({ children }) => {
  const todosValue = useTodos(todoAPI);

  return (
    <TodosContextProvider value={todosValue}>{children}</TodosContextProvider>
  );
};
