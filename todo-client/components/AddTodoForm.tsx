import {
  Box,
  Button,
  chakra,
  GridItem,
  Input,
  SimpleGrid,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { CreateTodoRequest } from "../api/todo";

type Props = {
  className?: string;
  onAddTodo: (req: CreateTodoRequest) => void;
};

const Component: React.VFC<Props> = ({ className, onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setTitle("");
    onAddTodo({ title });
  };

  return (
    <Box py={8} className={className}>
      <SimpleGrid
        as="form"
        w={{ base: "full", md: 7 / 12, xl: "750px" }}
        columns={{ base: 1, lg: 6 }}
        spacing={3}
        pt={1}
        mx="auto"
        onSubmit={handleSubmit}
      >
        <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
          <VisuallyHidden>todo</VisuallyHidden>
          <Input
            mt={0}
            size="lg"
            placeholder="Enter todo..."
            required={true}
            value={title}
            onChange={handleChangeTitle}
          />
        </GridItem>
        <GridItem colSpan={{ base: "auto", lg: 2 }}>
          <Button
            w="full"
            variant="solid"
            size="lg"
            type="submit"
            colorScheme="green"
          >
            追加する
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export const AddTodoForm = chakra(Component);
