import {
  Box,
  Button,
  chakra,
  GridItem,
  Input,
  SimpleGrid,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";

type Props = { className?: string };

const Component: React.FC<Props> = ({ className }) => {
  return (
    <Box py={8} className={className}>
      <SimpleGrid
        as="form"
        w={{ base: "full", md: 7 / 12, xl: "750px" }}
        columns={{ base: 1, lg: 6 }}
        spacing={3}
        pt={1}
        mx="auto"
        onSubmit={() => alert("Submit")}
      >
        <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
          <VisuallyHidden>todo</VisuallyHidden>
          <Input mt={0} size="lg" placeholder="Enter todo..." required={true} />
        </GridItem>
        <GridItem colSpan={{ base: "auto", lg: 2 }}>
          <Button
            w="full"
            variant="solid"
            size="lg"
            type="submit"
            colorScheme="purple"
          >
            Add
          </Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export const AddTodoForm = chakra(Component);
