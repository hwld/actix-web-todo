import { QuestionIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import React from "react";
import { CommandInfo } from "../hooks/useCommandsInfo";

type Props = { className?: string; commandInfos: CommandInfo[] };

const Component: React.FC<Props> = ({ className, commandInfos }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        className={className}
        aria-label="display commands"
        icon={<QuestionIcon w="100%" h="auto" />}
        backgroundColor="transparent"
        color="yellow.200"
        _hover={{ color: "yellow.300" }}
        _active={{ color: "yellow.400" }}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>コマンド一覧</ModalHeader>
          <ModalBody>
            <Stack spacing={3} mb={5}>
              {commandInfos.map((info) => (
                <Box>
                  <Heading size="md">{info.command}:</Heading>

                  <Heading as="h3" size="sm" ml={5} mt={2}>
                    説明:
                  </Heading>
                  <Text ml={8}>{info.description}</Text>

                  <Heading as="h3" size="sm" ml={5} mt={2}>
                    コマンド:
                  </Heading>
                  <Text ml={8}>{`\`${info.text}\``}</Text>
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
