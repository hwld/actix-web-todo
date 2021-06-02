import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useMemo } from "react";
import { DeleteTaskRequest, Task, UpdateTaskRequest } from "../api/task";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { MotionBox } from "./MotionBox";
import { TaskCheckBox } from "./TaskCheckBox";

export type CommonTaskItemProps = {
  className?: string;
  task: Task;
  onDeleteTask: (req: DeleteTaskRequest) => Promise<void>;
  onChangeChecked: (req: UpdateTaskRequest) => Promise<void>;
} & MotionPropsWithChakra;

const Component: React.VFC<CommonTaskItemProps> = ({
  className,
  task,
  onDeleteTask,
  onChangeChecked,
  motionTransition,
  ...motionProps
}) => {
  const title = useMemo(() => {
    if (task.isDone) {
      return <del>{task.title}</del>;
    }
    return task.title;
  }, [task.isDone, task.title]);

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeChecked({ id: task.id, isDone: e.target.checked });
  };

  const handleClickCloseButton = (e: SyntheticEvent) => {
    e.stopPropagation();
    onDeleteTask({ id: task.id });
  };

  return (
    <MotionBox {...motionProps} transition={motionTransition} w="100%" h="100%">
      <Flex className={className} p={5} justify="space-between" align="center">
        <TaskCheckBox
          width="70px"
          height="70px"
          borderRadius="50%"
          iconWidth="30px"
          isChecked={task.isDone}
          onChange={handleChangeChecked}
        />
        <Text fontWeight="bold" px={5} w="full" wordBreak="break-all">
          {title}
        </Text>
        <CloseButton
          color="red.500"
          onClick={handleClickCloseButton}
          alignSelf="flex-start"
        />
      </Flex>
    </MotionBox>
  );
};

export const CommonTaskItem = chakra(Component);
