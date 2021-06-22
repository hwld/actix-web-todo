import {
  Button,
  chakra,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
  Box,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import { IoMdHelp } from "react-icons/io";
import React from "react";
import { CommandInfo } from "../hooks/useCommandsInfo";

const QuestionIcon = chakra(IoMdHelp);

type Props = { className?: string; commandInfos: CommandInfo[] };

const Component: React.FC<Props> = ({ className, commandInfos }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Tooltip label="コマンドを確認する" hasArrow>
        <IconButton
          className={className}
          aria-label="display commands"
          color="gray.900"
          bgColor="yellow.200"
          _hover={{ bgColor: "yellow.300" }}
          _active={{ bgColor: "yellow.400" }}
          icon={<QuestionIcon w="70%" h="auto" />}
          onClick={onOpen}
          isRound
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>コマンド一覧</ModalHeader>
          <ModalBody>
            <Stack
              spacing={3}
              mb={5}
              divider={<StackDivider borderColor="gray.300" />}
            >
              {commandInfos.map((info) => (
                <Box>
                  <Heading size="md">{`\`${info.text}\``}</Heading>

                  <Heading as="h3" size="sm" ml={5} mt={4}>
                    説明:
                  </Heading>
                  <Text ml={8}>{info.description}</Text>
                </Box>
              ))}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const DisplayCommandButton = chakra(Component);
