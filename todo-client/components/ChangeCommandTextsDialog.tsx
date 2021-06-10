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
import React, { useMemo, useState } from "react";
import { Command, AllCommandObjs, isCommand } from "../hooks/useCommandObjs";

export type ChangeCommandTextsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultCommandTexts: AllCommandObjs;
  onChangeCommandTexts: (texts: AllCommandObjs) => void;
};

const Component: React.FC<ChangeCommandTextsDialogProps> = ({
  isOpen,
  onClose,
  defaultCommandTexts,
  onChangeCommandTexts,
}) => {
  const [commandObjs, setCommandObjs] = useState(defaultCommandTexts);

  const commandObjList = useMemo(() => {
    const list: { command: Command; text: string; description: string }[] = [];
    Object.keys(commandObjs).forEach((command) => {
      if (isCommand(command)) {
        list.push({
          command,
          text: commandObjs[command].text,
          description: commandObjs[command].description,
        });
      }
    });
    return list;
  }, [commandObjs]);

  const changeCommandObj = (command: Command, text: string) => {
    setCommandObjs((objs) => ({
      ...objs,
      [command]: { text, description: commandObjs[command].description },
    }));
  };

  const handleChangeCommandTexts = () => {
    onChangeCommandTexts(commandObjs);
    onClose();
  };

  const cancel = () => {
    setCommandObjs(commandObjs);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>コマンドを変更</ModalHeader>
        <ModalBody>
          <Stack spacing={5}>
            {commandObjList.map((obj) => {
              return (
                <FormControl key={obj.command}>
                  <FormLabel>{obj.command}</FormLabel>
                  <Input
                    value={obj.text}
                    onChange={({ target: { value } }) => {
                      changeCommandObj(obj.command, value);
                    }}
                  />
                  <FormHelperText>{obj.description}</FormHelperText>
                </FormControl>
              );
            })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={5} onClick={cancel}>
            中止
          </Button>
          <Button onClick={handleChangeCommandTexts}>変更</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ChangeCommandTextsDialog = Component;
