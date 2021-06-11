import { chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useMemo } from "react";
import { Task } from "../api/task";
import { UseTasksResult } from "../hooks/useTasks";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { MotionBox } from "./MotionBox";
import { TaskCheckBox } from "./TaskCheckBox";

export type TaskItemBaseProps = {
  className?: string;
  task: Task;
  onDeleteTask: UseTasksResult["deleteTask"];
  checked: boolean;
  onChangeChecked: (checked: boolean) => void;
} & MotionPropsWithChakra;

const Component: React.VFC<TaskItemBaseProps> = ({
  className,
  task,
  onDeleteTask,
  checked,
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

  const handleChangeChecked = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("?");
    onChangeChecked(e.target.checked);
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
          isChecked={checked}
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

export const TaskItemBase = chakra(Component);
