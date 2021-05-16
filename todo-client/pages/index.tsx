import { NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";
import { AddTodoForm } from "../components/AddTodoForm";
import { VStack, Text, Flex, Checkbox, CloseButton } from "@chakra-ui/react";

const Home: NextPage = () => {
  const todos = [...Array(100)];

  return (
    <>
      <Header mx="auto" bg="gray.900" />
      <AddTodoForm position="sticky" top="0" bg="gray.900" zIndex={1} />
      <VStack my={{ base: 6, lg: 12 }} spacing={6} align="center">
        {todos.map(() => (
          <Flex
            bg="gray.600"
            w={{ base: "95%", lg: "60%" }}
            p={5}
            borderRadius="10px"
            justify="space-between"
          >
            <Checkbox mr={3} size="lg" />
            <Text
              fontWeight="bold"
              px={3}
              pt={1}
              w="full"
              wordBreak="break-all"
            >
              TodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTod
              oTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodoTodo
            </Text>
            <CloseButton color="red.500" />
          </Flex>
        ))}
      </VStack>
    </>
  );
};

export default Home;
