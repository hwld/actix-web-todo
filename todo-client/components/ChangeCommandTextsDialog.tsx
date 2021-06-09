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
import { CommandObjs } from "../hooks/useCommandObjs";

export type ChangeCommandTextsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultCommandTexts: CommandObjs;
  onChangeCommandTexts: (texts: CommandObjs) => void;
};

const Component: React.FC<ChangeCommandTextsDialogProps> = ({
  isOpen,
  onClose,
  defaultCommandTexts,
  onChangeCommandTexts,
}) => {
  const [commandObjs, setCommandObjs] = useState(defaultCommandTexts);

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
            {commandObjs.map((obj) => {
              return (
                <FormControl key={obj.command}>
                  <FormLabel>{obj.command}</FormLabel>
                  <Input
                    value={obj.text}
                    onChange={({ target: { value } }) => {
                      console.log(value);
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
