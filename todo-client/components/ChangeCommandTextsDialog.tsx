import { Alert, AlertIcon, AlertTitle, Stack } from "@chakra-ui/react";
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

  const validationRules: {
    validator: (info: CommandInfo) => boolean;
    errorText: string;
  }[] = [
    {
      validator: ({ text }: CommandInfo) => {
        return text !== "";
      },
      errorText: "空欄があります",
    },
    {
      validator: (info: CommandInfo) => {
        return (
          internalCommandInfos
            .filter((i) => i.command !== info.command)
            // 空欄の重複は検証しない
            .filter((i) => i.text !== "")
            .every((i) => i.text !== info.text)
        );
      },
      errorText: "重複があります",
    },
  ];

  const validators = validationRules.map(({ validator }) => validator);

  // 1つでも失敗している検証を返す
  const failedValidations = validationRules.filter((rule) => {
    return internalCommandInfos.some((info) => !rule.validator(info));
  });

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
    onChangeCommandTexts(
      internalCommandInfos.map(({ command, text }) => ({ command, text }))
    );
    handleClose();
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
                  validators={validators}
                />
              );
            })}
          </Stack>
          <Stack>
            {failedValidations.map((rule, i) => (
              <Alert status="error" key={i}>
                <AlertIcon />
                <AlertTitle>{rule.errorText}</AlertTitle>
              </Alert>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={5} onClick={handleClose}>
            中止
          </Button>
          <Button
            onClick={handleChangeCommandText}
            disabled={failedValidations.length !== 0}
          >
            変更
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ChangeCommandTextsDialog = Component;
