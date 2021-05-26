import React, { useContext } from "react";
import { getDefaultUseTodosResult, UseTodosResult } from "../hooks/useTodos";

const TodosContext = React.createContext<UseTodosResult>(
  getDefaultUseTodosResult()
);

export const TodosContextProvider: React.FC<{
  value?: Partial<UseTodosResult>;
}> = ({ value, children }) => {
  return (
    <TodosContext.Provider value={{ ...getDefaultUseTodosResult(), ...value }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = (): UseTodosResult => useContext(TodosContext);
