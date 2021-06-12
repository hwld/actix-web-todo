import { Box, chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { forwardRef, SyntheticEvent, useMemo } from "react";
import { Task } from "../api/task";
import { UseTasksResult } from "../hooks/useTasks";
import { TaskCheckBox } from "./TaskCheckBox";

export type TaskItemBaseProps = {
  className?: string;
  task: Task;
  onDeleteTask: UseTasksResult["deleteTask"];
  checked: boolean;
  onChangeChecked: (checked: boolean) => void;
};

const Component = forwardRef<HTMLDivElement, TaskItemBaseProps>(
  ({ className, task, onDeleteTask, checked, onChangeChecked }, ref) => {
    const title = useMemo(() => {
      if (task.isDone) {
        return <del>{task.title}</del>;
      }
      return task.title;
    }, [task.isDone, task.title]);

    const handleChangeChecked = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      onChangeChecked(e.target.checked);
    };

    const handleClickCloseButton = (e: SyntheticEvent) => {
      e.stopPropagation();
      onDeleteTask({ id: task.id });
    };

    return (
      <Flex
        ref={ref}
        className={className}
        p={5}
        justify="space-between"
        align="center"
        bg="gray.600"
        borderRadius="10px"
        w="100%"
        h="100%"
      >
        <Box ref={ref} />
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
    );
  }
);

export const TaskItemBase = chakra(Component);
