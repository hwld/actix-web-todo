import { chakra } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../api/task";
import {
  ChangeFontSizeTodoItem,
  ChangeFontSizeTodoItemProps,
} from "./ChangeFontSizeTodoItem";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";
import { GiveUpAllTodoItem, GiveUpAllTodoItemProps } from "./GiveUpAllTodoItem";

type Props = Omit<
  {
    taskFontSize: number;
  } & GiveUpAllTodoItemProps &
    // taskFontSizeを使う
    Omit<ChangeFontSizeTodoItemProps, "defaultFontSize"> &
    CommonTaskItemProps,
  "task"
> & { todo: Todo };

const Component: React.FC<Props> = ({ className, taskFontSize, ...others }) => {
  const {
    todo,
    allTodos,
    onDeleteTask,
    onDeleteMultiple,
    onChangeChecked,
    onChangeFontSize,
    ...motionProps
  } = others;

  const giveUpAllText = "`すべてを諦める`";
  const changeFontSizeText = "`文字の大きさを変える`";

  switch (todo.title) {
    case giveUpAllText: {
      return (
        <GiveUpAllTodoItem
          className={className}
          task={todo}
          allTodos={allTodos}
          onDeleteTask={onDeleteTask}
          onDeleteMultiple={onDeleteMultiple}
          onChangeChecked={onChangeChecked}
          fontSize={`${taskFontSize}rem`}
          {...motionProps}
        />
      );
    }
    case changeFontSizeText: {
      return (
        <ChangeFontSizeTodoItem
          className={className}
          defaultFontSize={taskFontSize}
          task={todo}
          onDeleteTask={onDeleteTask}
          onChangeFontSize={onChangeFontSize}
          onChangeChecked={onChangeChecked}
          fontSize={`${taskFontSize}rem`}
          {...motionProps}
        />
      );
    }
    default: {
      return (
        <CommonTaskItem
          className={className}
          task={todo}
          onDeleteTask={onDeleteTask}
          onChangeChecked={onChangeChecked}
          fontSize={`${taskFontSize}rem`}
          {...motionProps}
        />
      );
    }
  }
};

export const TodoItem = chakra(Component);
