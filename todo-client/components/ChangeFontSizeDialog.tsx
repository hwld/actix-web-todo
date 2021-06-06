import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { extractNumberPart, TaskFontSize } from "../hooks/useTaskFontSize";

export type ChangeFontSizeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultFontSize: TaskFontSize;
  onChangeFontSize: (fontSize: TaskFontSize) => void;
};

const Component: React.VFC<ChangeFontSizeDialogProps> = ({
  isOpen,
  onClose,
  defaultFontSize,
  onChangeFontSize,
}) => {
  const defaultFontSizeNumberPart = extractNumberPart(defaultFontSize);
  const [fontSizeNumber, setFontSizeNumber] = useState(
    defaultFontSizeNumberPart
  );
  const fontSize: TaskFontSize = `${fontSizeNumber}rem` as const;

  const cancel = () => {
    setFontSizeNumber(defaultFontSizeNumberPart);
    onClose();
  };

  const handleChangeFontSize = () => {
    onChangeFontSize(`${fontSizeNumber}rem` as const);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Taskのフォントサイズの変更</ModalHeader>
        <ModalBody>
          <Text textAlign="center" fontSize={`${fontSize}`}>
            サンプルTaskテキスト
          </Text>
          <Slider
            aria-label="fontSize-slider"
            value={fontSizeNumber}
            onChange={setFontSizeNumber}
            min={1}
            max={5}
            step={0.1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={5} onClick={cancel}>
            中止
          </Button>
          <Button onClick={handleChangeFontSize}>変更</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const ChangeFontSizeDialog = Component;
