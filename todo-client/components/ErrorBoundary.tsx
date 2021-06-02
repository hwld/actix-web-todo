import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UseTodosError } from "../hooks/useTodos";

type Props = {
  error: UseTodosError | undefined;
};

const Component: React.FC<Props> = ({ children, error }) => {
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