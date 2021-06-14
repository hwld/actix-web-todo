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
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { DeleteMultipleTasksRequest, Done } from "../api/task";
import { TaskFontSize } from "../hooks/useTaskFontSize";
import { ErrorType } from "../hooks/useTasks";
import { DoneBoxIcon } from "./DoneBoxIcon";
import { DoneItem, DoneItemProps } from "./DoneItem";

type Props = {
  className?: string;
  dones: Done[];
  onDeleteDone: DoneItemProps["onDeleteTask"];
  onDeleteMultipleDone: (req: DeleteMultipleTasksRequest) => Promise<ErrorType>;
  onUpdateDone: DoneItemProps["onUpdateTodo"];
  taskFontSize: TaskFontSize;
};

const IconButton = styled(ChakraIconButton)`
  & > svg {
    width: 60%;
    height: 100%;
  }
`;

const Component: React.VFC<Props> = ({
  className,
  dones,
  onDeleteDone,
  onDeleteMultipleDone,
  onUpdateDone,
  taskFontSize,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAllDones = async () => {
    onDeleteMultipleDone({ ids: dones.map((d) => d.id) });
  };

  return (
    <Tooltip label="完了したタスク一覧を表示する">
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
                      onDeleteTask={onDeleteDone}
                      onUpdateTodo={onUpdateDone}
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
    </Tooltip>
  );
};

export const DoneBox = chakra(Component);
