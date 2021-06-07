import { chakra } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../api/task";
import { CommandTexts } from "../hooks/useCommandTexts";
import { TaskFontSize } from "../hooks/useTaskFontSize";
import {
  ChangeFontSizeTodoItem,
  ChangeFontSizeTodoItemProps,
} from "./ChangeFontSizeTodoItem";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";
import { GiveUpAllTodoItem, GiveUpAllTodoItemProps } from "./GiveUpAllTodoItem";

type Props = {
  todo: Todo;
  todoFontSize: TaskFontSize;
  commandTexts: CommandTexts;
} & Omit<
  GiveUpAllTodoItemProps &
    // taskFontSizeを使う
    Omit<ChangeFontSizeTodoItemProps, "defaultFontSize"> &
    CommonTaskItemProps,
  "task"
>;

const Component: React.VFC<Props> = ({
  className,
  todoFontSize,
  commandTexts,
  ...others
}) => {
  const {
    todo,
    allTodos,
    onDeleteTask,
    onDeleteMultiple,
    onChangeChecked,
    onChangeFontSize,
    ...motionProps
  } = others;

  switch (todo.title) {
    case `\`${commandTexts.giveUpAll}\``: {
      return (
        <GiveUpAllTodoItem
          className={className}
          task={todo}
          allTodos={allTodos}
          onDeleteTask={onDeleteTask}
          onDeleteMultiple={onDeleteMultiple}
          onChangeChecked={onChangeChecked}
          // 直接渡せない
          fontSize={`${todoFontSize}`}
          {...motionProps}
        />
      );
    }
    case `\`${commandTexts.changeFontSize}\``: {
      return (
        <ChangeFontSizeTodoItem
          className={className}
          defaultFontSize={todoFontSize}
          task={todo}
          onDeleteTask={onDeleteTask}
          onChangeFontSize={onChangeFontSize}
          onChangeChecked={onChangeChecked}
          fontSize={`${todoFontSize}`}
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
          fontSize={`${todoFontSize}`}
          {...motionProps}
        />
      );
    }
  }
};

export const TodoItem = chakra(Component);
