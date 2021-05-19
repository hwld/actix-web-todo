import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { TodoCheckBox } from "./TodoCheckBox";

type Props = { className?: string; todo: string };

const Component: React.FC<Props> = ({ className, todo }) => {
  return (
    <Flex className={className} p={5} justify="space-between">
      <TodoCheckBox
        width="70px"
        height="70px"
        borderRadius="50%"
        iconWidth="30px"
        colorScheme="green"
      />
      <Text fontWeight="bold" px={3} pt={1} w="full" wordBreak="break-all">
        {todo}
      </Text>
      <CloseButton color="red.500" />
    </Flex>
  );
};

export const TodoItem = chakra(Component);
