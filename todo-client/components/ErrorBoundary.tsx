import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTasksState } from "../contexts/TasksContext";

type Props = {
  children: React.ReactNode;
};

const Component: React.VFC<Props> = ({ children }) => {
  const { error } = useTasksState();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: error.title,
        description: error.description,
        status: "error",
        isClosable: true,
      });
    }
  }, [error, toast]);

  return <>{children}</>;
};

export const ErrorBoundary = Component;
