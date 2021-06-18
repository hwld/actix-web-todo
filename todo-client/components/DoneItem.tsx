import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { Done } from "../api/task";
import { CommonTaskItem } from "./CommonTaskItem";

export type DoneItemProps = { className?: string; done: Done };

const Component = forwardRef<HTMLDivElement, DoneItemProps>(
  ({ className, done }, ref) => {
    return <CommonTaskItem ref={ref} className={className} task={done} />;
  }
);

export const DoneItem = chakra(motion(Component));
