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
import { useTasksOperator, useTasksState } from "../contexts/TasksContext";
import { TaskFontSize } from "../hooks/useTaskFontSize";
import { DoneBoxIcon } from "./DoneBoxIcon";
import { DoneItem } from "./DoneItem";

type Props = {
  className?: string;
  taskFontSize: TaskFontSize;
};

const IconButton = styled(ChakraIconButton)`
  & > svg {
    width: 60%;
    height: 100%;
  }
`;

const Component: React.VFC<Props> = ({ className, taskFontSize }) => {
  const { dones } = useTasksState();
  const { deleteMultipleTasks } = useTasksOperator();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAllDones = async () => {
    deleteMultipleTasks({ ids: dones.map((d) => d.id) });
  };

  return (
    <chakra.span className={className}>
      <IconButton
        aria-label="checked task"
        colorScheme="blue"
        boxSize="100px"
        borderRadius="50%"
        icon={<DoneBoxIcon>{dones.length}</DoneBoxIcon>}
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
            <VStack my={10} spacing={6} w="100%" px="5%">
              <AnimatePresence>
                {dones.map((done) => (
                  <DoneItem
                    key={done.id}
                    done={done}
                    initial={{ x: 0 }}
                    fontSize={`${taskFontSize}`}
                    layout
                    exit={{ x: "-300px", opacity: 0 }}
                  />
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
