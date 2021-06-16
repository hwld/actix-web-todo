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

  const [errors, setErrors] = useState<
    (
      | { type: "duplication"; fields: Command[] }
      | { type: "blank"; fields: Command[] }
    )[]
  >([]);

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
    const internalTexts = internalCommandInfos.map(({ text }) => text);

    // 空欄がないか
    if (!internalTexts.every((t) => t.length !== 0)) {
      const fields = internalCommandInfos
        .filter(({ text }) => text.length === 0)
        .map(({ command }) => command);

      setErrors((errors) => [
        ...errors.filter((e) => e.type !== "blank"),
        { type: "blank", fields },
      ]);
      return;
    }
    // エラーをリセット
    setErrors((errors) => errors.filter((e) => e.type !== "blank"));

    // すべてが異なるテキストか
    const areAllUnique = internalCommandInfos.every(
      (info, index) => internalTexts.indexOf(info.text) === index
    );
    if (!areAllUnique) {
      let fields: Command[] = [];
      internalCommandInfos.forEach((info) => {
        // 自分を除くCommandInfoに同じテキストが存在している場合、自分をエラーが起こっているフィールドとする
        const isErrorField = internalCommandInfos
          .filter((i) => i.command !== info.command)
          .some((i) => i.text === info.text);
        if (isErrorField) {
          fields = [...fields, info.command];
        }
      });

      setErrors((errors) => [
        ...errors.filter((e) => e.type !== "duplication"),
        { type: "duplication", fields },
      ]);
      return;
    }
    // エラーをリセット
    setErrors((errors) => errors.filter((e) => e.type !== "duplication"));

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
                  isInvalid={errors
                    .flatMap((error) => error.fields)
                    .includes(info.command)}
                />
              );
            })}
          </Stack>
          <Stack>
            {errors.map((error) => {
              let errorText;
              if (error.type === "duplication") {
                errorText = "重複しています";
              } else if (error.type === "blank") {
                errorText = "空欄があります";
              }

              return (
                <Alert status="error" key={error.type}>
                  <AlertIcon />
                  <AlertTitle>{errorText}</AlertTitle>
                </Alert>
              );
            })}
          </Stack>
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
