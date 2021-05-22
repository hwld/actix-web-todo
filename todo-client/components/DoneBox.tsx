import {
  chakra,
  IconButton as ChakraIconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MdPlaylistAddCheck } from "react-icons/md";
import { DeleteTodoRequest, Todo, UpdateTodoRequest } from "../api/todo";
import { MotionBox } from "./MotionBox";
import { TodoItem } from "./TodoItem";

type Props = {
  dones: Todo[];
  deleteTodo: (req: DeleteTodoRequest) => void;
  updateTodo: (req: UpdateTodoRequest) => void;
};

const IconButton = styled(ChakraIconButton)`
  & > svg {
    width: 60%;
    height: 100%;
  }
`;

const Component: React.FC<Props> = ({ dones, deleteTodo, updateTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(dones);

  return (
    <chakra.span position="fixed" right="80px" bottom="50px">
      <IconButton
        aria-label="checked todo"
        colorScheme="blue"
        boxSize="100px"
        borderRadius="50%"
        icon={
          <>
            <MdPlaylistAddCheck />
            <chakra.span
              pos="absolute"
              top="0"
              right="0"
              transform="translate(30%, -30%)"
              px={3}
              py={1}
              fontSize="2xl"
              fontWeight="bold"
              bg="yellow.300"
              color="black"
              rounded="full"
            >
              {dones.length}
            </chakra.span>
          </>
        }
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent
          position="fixed"
          top="50px"
          right="50px"
          bottom="50px"
          margin="0"
        >
          <ModalHeader>完了した作業</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="auto">
            <VStack my={10} spacing={6}>
              <AnimatePresence>
                {dones.map((done) => (
                  <MotionBox
                    key={done.id}
                    layout
                    w="80%"
                    // checkBoxのアニメーションのあとに終了したい。現在checkBoxのアニメーションの時間に合わせて指定する。
                    // どうにかしてcheckBoxのアニメーションの時間を外側から指定できたらいいんだけど・・・
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <TodoItem
                      bg="gray.600"
                      borderRadius="10px"
                      todo={done}
                      deleteTodo={deleteTodo}
                      updateTodo={updateTodo}
                    />
                  </MotionBox>
                ))}
              </AnimatePresence>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </chakra.span>
  );
};

export const DoneBox = Component;
