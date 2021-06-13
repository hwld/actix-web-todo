import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { Command, CommandInfo } from "../hooks/useCommandsInfo";

export type ChangeCommandTextsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultCommandInfos: CommandInfo[];
  onChangeCommandTexts: (
    commandTexts: Pick<CommandInfo, "command" | "text">[]
  ) => void;
};

const Component: React.FC<ChangeCommandTextsDialogProps> = ({
  isOpen,
  onClose,
  defaultCommandInfos,
  onChangeCommandTexts,
}) => {
  const [commandInfos, setCommandInfos] = useState(defaultCommandInfos);

  const changeCommandText = (command: Command, text: string) => {
    setCommandInfos((infos) => {
      return infos.map((info) => {
        if (info.command === command) {
          return { ...info, text };
        }
        return info;
      });
    });
  };

  const handleChangeCommandText = () => {
    onChangeCommandTexts(commandInfos);
    onClose();
  };

  const cancel = () => {
    // 内部のcommandTextをリセットする
    setCommandInfos(defaultCommandInfos);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>コマンドを変更</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            {commandInfos.map((info) => {
              return (
                <FormControl key={info.command}>
                  <FormLabel>{info.command}</FormLabel>
                  <Input
                    value={info.text}
                    onChange={({ target: { value } }) => {
                      changeCommandText(info.command, value);
                    }}
                  />
                  <FormHelperText>{info.description}</FormHelperText>
                </FormControl>
              );
            })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={5} onClick={cancel}>
            中止
          </Button>
          <Button onClick={handleChangeCommandText}>変更</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ChangeCommandTextsDialog = Component;
