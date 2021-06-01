import { MotionProps } from "framer-motion";

// Chakraと使用するときにtransitionのpropsが被るので別の名前にする
export type MotionPropsWithChakra = Omit<MotionProps, "transition"> & {
  motionTransition?: MotionProps["transition"];
};
