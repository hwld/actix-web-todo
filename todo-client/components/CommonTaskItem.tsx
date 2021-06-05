import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useMemo, useState } from "react";
import { Task } from "../api/task";
import { UseTasksResult } from "../hooks/useTasks";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { MotionBox } from "./MotionBox";
import { TaskCheckBox } from "./TaskCheckBox";

export type CommonTaskItemProps = {
  className?: string;
  task: Task;
  onDeleteTask: UseTasksResult["deleteTask"];
  onChangeChecked: UseTasksResult["updateTask"];
} & MotionPropsWithChakra;

const Component: React.VFC<CommonTaskItemProps> = ({
  className,
  task,
  onDeleteTask,
  onChangeChecked,
  motionTransition,
  ...motionProps
}) => {
  const [isChecked, setIsChecked] = useState(task.isDone);

  const title = useMemo(() => {
    if (task.isDone) {
      return <del>{task.title}</del>;
    }
    return task.title;
  }, [task.isDone, task.title]);

  const handleChangeChecked = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(e.target.checked);

    const errorType = await onChangeChecked({
      id: task.id,
      isDone: e.target.checked,
    });

    if (errorType === "Error") {
      setIsChecked(!e.target.checked);
    }
  };

  const handleClickCloseButton = (e: SyntheticEvent) => {
    e.stopPropagation();
    onDeleteTask({ id: task.id });
  };

  return (
    <MotionBox {...motionProps} transition={motionTransition} w="100%" h="100%">
      <Flex
        className={className}
        p={5}
        justify="space-between"
        align="center"
        bg="gray.600"
        borderRadius="10px"
      >
        <TaskCheckBox
          width="70px"
          height="70px"
          borderRadius="50%"
          iconWidth="30px"
          isChecked={isChecked}
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
