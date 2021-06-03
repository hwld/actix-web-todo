import { MotionProps } from "framer-motion";

// Chakraと使用するときにtransitionのpropsが被るので別の名前にする
export type MotionPropsWithChakra = Omit<MotionProps, "transition"> & {
  motionTransition?: MotionProps["transition"];
};

// OmitはTにUnitを指定すると、共通したpropからKを除外するようになるので、UnitそれぞれのOmitを取れるように、Unit Distributionを使用する
export type DistributeOmit<T, K extends string | number | symbol> =
  T extends unknown ? Omit<T, K> : never;
