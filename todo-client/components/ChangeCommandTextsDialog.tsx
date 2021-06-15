import {
  Alert,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
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
import { ChangeCommandTextField } from "./ChangeCommandTextField";

export type ChangeCommandTextsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultCommandInfos: CommandInfo[];
  onChangeCommandTexts: (
    commandTexts: Pick<CommandInfo, "command" | "text">[]
  ) => void;
};

const Component: React.VFC<ChangeCommandTextsDialogProps> = ({
  isOpen,
  onClose,
  defaultCommandInfos,
  onChangeCommandTexts,
}) => {
  const [internalCommandInfos, setInternalCommandInfos] = useState(
    defaultCommandInfos
  );

  const [errorField, setErrorField] = useState<Command | null>(null);

  const changeCommandText = (command: Command, text: string) => {
    setInternalCommandInfos((infos) => {
      return infos.map((info) => {
        if (info.command === command) {
          return { ...info, text };
        }
        return info;
      });
    });
  };

  const handleChangeCommandText = () => {
    const areAllUnique = internalCommandInfos.every((info, index, self) => {
      const isUnique =
        self.map(({ text }) => text).indexOf(info.text) === index;
      if (!isUnique) {
        setErrorField(info.command);
      }
      return isUnique;
    });

    if (areAllUnique) {
      onChangeCommandTexts(
        internalCommandInfos.map(({ command, text }) => ({ command, text }))
      );
      handleClose();
    }
  };

  const handleClose = () => {
    // 内部のcommandTextをリセットする
    setInternalCommandInfos(defaultCommandInfos);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>コマンドを変更</ModalHeader>
        <ModalBody>
          <Stack spacing={5} mb={5}>
            {internalCommandInfos.map((info) => {
              return (
                <ChangeCommandTextField
                  key={info.command}
                  info={info}
                  changeCommandText={changeCommandText}
                  isInvalid={errorField === info.command}
                />
              );
            })}
          </Stack>
          {errorField && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>重複しています</AlertTitle>
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={5} onClick={handleClose}>
            中止
          </Button>
          <Button onClick={handleChangeCommandText}>変更</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ChangeCommandTextsDialog = Component;
