import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { TasksError } from "../contexts/TasksContext";

type Props = { error: TasksError | undefined };

// 実際にReactElementを返す必要はないのでhookとしてまとめることもできたが、
// toastはUIだと思ったのでコンポーネントにした。
const Component: React.VFC<Props> = ({ error }) => {
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

  return <></>;
};

export const ErrorAlert = Component;
