import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onGiveUpAll: () => void;
};

const Component: React.FC<Props> = ({ isOpen, onClose, onGiveUpAll }) => {
  const handleClickGiveUpButton = () => {
    onGiveUpAll();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>すべてを諦めますか？</ModalHeader>
        <ModalFooter>
          <Button mr={5} onClick={onClose}>
            諦めない
          </Button>
          <Button colorScheme="red" onClick={handleClickGiveUpButton}>
            諦める
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const GiveUpDialog = Component;
