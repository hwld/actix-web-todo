import {
  Button,
  chakra,
  IconButton as ChakraIconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MdPlaylistAddCheck } from "react-icons/md";
import {
  DeleteMultipleTodosRequest,
  DeleteTodoRequest,
  Todo,
  UpdateTodoRequest,
} from "../api/todo";
import { MotionBox } from "./MotionBox";
import { CommonTodoItem } from "./CommonTodoItem";

type Props = {
  className?: string;
  dones: Todo[];
  todoFontSize: string;
  onDeleteTodo: (req: DeleteTodoRequest) => Promise<void>;
  onDeleteMultipleTodo: (req: DeleteMultipleTodosRequest) => void;
  onUpdateTodo: (req: UpdateTodoRequest) => Promise<void>;
};

const IconButton = styled(ChakraIconButton)`
  & > svg {
    width: 60%;
    height: 100%;
  }
`;

const Component: React.FC<Props> = ({
  className,
  dones,
  todoFontSize,
  onDeleteTodo,
  onDeleteMultipleTodo,
  onUpdateTodo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAllDones = async () => {
    onDeleteMultipleTodo({ ids: dones.map((d) => d.id) });
  };

  return (
    <chakra.span className={className}>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          position="fixed"
          top="50px"
          right="50px"
          bottom="50px"
          left={{ base: "50px", md: "auto" }}
          margin="0"
          width={{ base: "auto", md: "50vw" }}
          maxW="none"
        >
          <ModalHeader>完了した作業</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="auto" p={0}>
            <VStack my={10} spacing={6}>
              <AnimatePresence>
                {dones.map((done) => (
                  <MotionBox
                    key={done.id}
                    layout
                    w="90%"
                    // checkBoxのアニメーションのあとに終了したい。現在checkBoxのアニメーションの時間に合わせて指定する。
                    // どうにかしてcheckBoxのアニメーションの時間を外側から指定できたらいいんだけど・・・
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <CommonTodoItem
                      bg="gray.600"
                      borderRadius="10px"
                      fontSize={todoFontSize}
                      todo={done}
                      onDeleteTodo={onDeleteTodo}
                      onChangeChecked={onUpdateTodo}
                    />
                  </MotionBox>
                ))}
              </AnimatePresence>
            </VStack>
          </ModalBody>
          <ModalFooter bg="gray.600">
            <Button mr={5} onClick={onClose}>
              閉じる
            </Button>
            <Button colorScheme="red" onClick={handleDeleteAllDones}>
              すべて削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </chakra.span>
  );
};

export const DoneBox = chakra(Component);
