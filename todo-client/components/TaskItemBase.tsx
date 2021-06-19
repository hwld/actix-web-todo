import { Box, chakra, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { forwardRef, SyntheticEvent, useMemo } from "react";
import { DeleteTaskRequest, Task } from "../api/task";
import { useTaskFontSize } from "../contexts/TaskFontSizeContext";
import { TaskCheckBox } from "./TaskCheckBox";

export type TaskItemBaseProps = {
  className?: string;
  task: Task;
  checked: boolean;
  onChangeChecked: (checked: boolean) => void;
  onDeleteTask: (req: DeleteTaskRequest) => void;
};

const Component = forwardRef<HTMLDivElement, TaskItemBaseProps>(
  ({ className, task, checked, onChangeChecked, onDeleteTask }, ref) => {
    const taskFontSize = useTaskFontSize();

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
        fontSize={`${taskFontSize}`}
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
