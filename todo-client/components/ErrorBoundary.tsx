import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UseTasksError } from "../hooks/useTasks";

type Props = {
  children: React.ReactNode;
  error: UseTasksError | undefined;
};

const Component: React.VFC<Props> = ({ children, error }) => {
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
