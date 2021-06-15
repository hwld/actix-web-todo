import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Command, CommandInfo } from "../hooks/useCommandsInfo";

type Props = {
  info: CommandInfo;
  changeCommandText: (command: Command, text: string) => void;
  isInvalid?: boolean;
};

const Component: React.FC<Props> = ({ info, changeCommandText, isInvalid }) => {
  const handleChangeCommandText: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    changeCommandText(info.command, value);
  };

  return (
    <FormControl key={info.command}>
      <FormLabel>{info.command}</FormLabel>
      <Input
        value={info.text}
        onChange={handleChangeCommandText}
        isInvalid={isInvalid}
      />
      <FormHelperText>{info.description}</FormHelperText>
    </FormControl>
  );
};

export const ChangeCommandTextField = Component;
