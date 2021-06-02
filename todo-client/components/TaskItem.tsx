import { chakra, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { DeleteMultipleTasksRequest, Task, Todo } from "../api/task";
import { MotionPropsWithChakra } from "../types/ChakraMotionProps";
import { ChangeFontSizeTaskItem } from "./ChangeFontSizeTaskItem";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";
import { GiveUpAllTodoItem } from "./GiveUpAllTodoItem";

type Props = {
  className?: string;
  task: Task;
  allTodos: Todo[];
  onDeleteTask: CommonTaskItemProps["onDeleteTask"];
  onDeleteMultiple: (req: DeleteMultipleTasksRequest) => Promise<void>;
  onChangeChecked: CommonTaskItemProps["onChangeChecked"];
  taskFontSize: number;
  setTaskFontSize: (fontSize: number) => void;
} & MotionPropsWithChakra;

const Component: React.VFC<Props> = ({
  className,
  task,
  allTodos,
  onDeleteTask,
  onDeleteMultiple,
  onChangeChecked,
  taskFontSize,
  setTaskFontSize,
  ...motionProps
}) => {
  const giveUpAllText = "`すべてを諦める`";
  const changeFontSizeText = "`文字の大きさを変える`";

  const taskStyles: ChakraProps = {
    bg: "gray.600",
    borderRadius: "10px",
    fontSize: `${taskFontSize}rem`,
  };
  const taskMotion: MotionPropsWithChakra = {
    layout: true,
    initial: { x: -300 },
    animate: { x: 0 },
    // checkBoxのアニメーションのあとに終了したい。現在checkBoxのアニメーションの時間に合わせて指定する。
    // どうにかしてcheckBoxのアニメーションの時間を外側から指定できたらいいんだけど・・・
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    ...motionProps,
  };

  switch (task.title) {
    case giveUpAllText: {
      return (
        <GiveUpAllTodoItem
          key={task.id}
          {...taskStyles}
          {...taskMotion}
          className={className}
          task={task}
          allTodos={allTodos}
          onDeleteTask={onDeleteTask}
          onDeleteMultiple={onDeleteMultiple}
          onChangeChecked={onChangeChecked}
        />
      );
    }
    case changeFontSizeText: {
      return (
        <ChangeFontSizeTaskItem
          key={task.id}
          {...taskStyles}
          {...taskMotion}
          className={className}
          defaultFontSize={taskFontSize}
          task={task}
          onDeleteTask={onDeleteTask}
          onChangeFontSize={setTaskFontSize}
          onChangeChecked={onChangeChecked}
        />
      );
    }
    default: {
      return (
        <CommonTaskItem
          key={task.id}
          className={className}
          {...taskStyles}
          {...taskMotion}
          task={task}
          onDeleteTask={onDeleteTask}
          onChangeChecked={onChangeChecked}
        />
      );
    }
  }
};

export const TaskItem = chakra(Component);
