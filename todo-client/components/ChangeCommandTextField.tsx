import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Command, CommandInfo } from "../hooks/useCommandsInfo";

type Props = {
  info: CommandInfo;
  changeCommandText: (command: Command, text: string) => void;
  validators: ((commandInfo: CommandInfo) => boolean)[];
};

const Component: React.FC<Props> = ({
  info,
  changeCommandText,
  validators,
}) => {
  const handleChangeCommandText: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    changeCommandText(info.command, value);
  };

  const isValid = useMemo(() => {
    return validators.every((validator) => validator(info));
  }, [info, validators]);

  return (
    <FormControl key={info.command}>
      <FormLabel color={isValid ? "gray.100" : "red.400"}>
        {info.command}
      </FormLabel>
      <Input
        value={info.text}
        onChange={handleChangeCommandText}
        isInvalid={!isValid}
      />
      <FormHelperText color={isValid ? "gray.300" : "red.200"}>
        {info.description}
      </FormHelperText>
    </FormControl>
  );
};

export const ChangeCommandTextField = Component;
