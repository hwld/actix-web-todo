import { chakra } from "@chakra-ui/react";
import { HTMLChakraProps } from "@chakra-ui/system";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">> & {
  children: React.ReactNode;
};

export const MotionBox: React.VFC<MotionBoxProps> = motion(chakra.div);
