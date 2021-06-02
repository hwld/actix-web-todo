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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultFontSize: number;
  onChangeFontSize: (fontSize: number) => void;
};

const Component: React.VFC<Props> = ({
  isOpen,
  onClose,
  defaultFontSize,
  onChangeFontSize,
}) => {
  const [fontSize, setFontSize] = useState(defaultFontSize);

  const cancel = () => {
    setFontSize(defaultFontSize);
    onClose();
  };

  const handleChangeFontSize = () => {
    onChangeFontSize(fontSize);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Todoのフォントサイズの変更</ModalHeader>
        <ModalBody>
          <Text textAlign="center" fontSize={`${fontSize}rem`}>
            サンプルTodoテキスト
          </Text>
          <Slider
            aria-label="fontSize-slider"
            value={fontSize}
            onChange={setFontSize}
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
