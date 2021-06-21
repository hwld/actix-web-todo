import { chakra } from "@chakra-ui/react";
import React from "react";
import { MdPlaylistAddCheck } from "react-icons/md";

type Props = { children: React.ReactNode; className?: string };

const Component: React.VFC<Props> = ({ children, className }) => {
  return (
    <>
      <MdPlaylistAddCheck className={className} />
      <chakra.span
        pos="absolute"
        top="0"
        right="0"
        transform="translate(30%, -30%)"
        px={3}
        py={1}
        fontSize="2xl"
        fontWeight="bold"
        bg="yellow.300"
        color="black"
        rounded="full"
      >
        {children}
      </chakra.span>
    </>
  );
};

export const DoneBoxIcon = chakra(Component);
