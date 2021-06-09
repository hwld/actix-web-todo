import { chakra } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../api/task";
import { CommandObjs } from "../hooks/useCommandObjs";
import { TaskFontSize } from "../hooks/useTaskFontSize";
import {
  ChangeCommandTextsTodoItem,
  ChangeCommandTextsTodoItemProps,
} from "./ChangeCommandTextsTodoItem";
import {
  ChangeFontSizeTodoItem,
  ChangeFontSizeTodoItemProps,
} from "./ChangeFontSizeTodoItem";
import { CommonTaskItem, CommonTaskItemProps } from "./CommonTaskItem";
import { GiveUpAllTodoItem, GiveUpAllTodoItemProps } from "./GiveUpAllTodoItem";

type Props = {
  todo: Todo;
  todoFontSize: TaskFontSize;
  commandObjs: CommandObjs;
} & Omit<
  GiveUpAllTodoItemProps &
    // taskFontSizeを使う
    Omit<ChangeFontSizeTodoItemProps, "defaultFontSize"> &
    // commandTextsを使う
    Omit<ChangeCommandTextsTodoItemProps, "defaultCommandTexts"> &
    CommonTaskItemProps,
  "task" | "onChangeChecked"
>;

const Component: React.VFC<Props> = ({
  className,
  todoFontSize,
  commandObjs,
  ...others
}) => {
  const {
    todo,
    allTodos,
    onDeleteTask,
    onDeleteMultiple,
    onUpdateTodo,
    onChangeFontSize,
    onChangeCommandTexts,
    ...motionProps
  } = others;

  switch (todo.title) {
    case `\`${
      commandObjs.find((obj) => obj.command === "giveUpAll")?.text
    }\``: {
      return (
        <GiveUpAllTodoItem
          className={className}
          task={todo}
          allTodos={allTodos}
          onDeleteTask={onDeleteTask}
          onDeleteMultiple={onDeleteMultiple}
          onUpdateTodo={onUpdateTodo}
          // 直接渡せない
          fontSize={`${todoFontSize}`}
          {...motionProps}
        />
      );
    }
    case `\`${
      commandObjs.find((obj) => obj.command === "changeFontSize")?.text
    }\``: {
      return (
        <ChangeFontSizeTodoItem
          className={className}
          defaultFontSize={todoFontSize}
          task={todo}
          onDeleteTask={onDeleteTask}
          onUpdateTodo={onUpdateTodo}
          onChangeFontSize={onChangeFontSize}
          fontSize={`${todoFontSize}`}
          {...motionProps}
        />
      );
    }
    case `\`${
      commandObjs.find((obj) => obj.command === "changeCommandObjs")?.text
    }\``: {
      return (
        <ChangeCommandTextsTodoItem
          className={className}
          task={todo}
          onDeleteTask={onDeleteTask}
          onUpdateTodo={onUpdateTodo}
          defaultCommandTexts={commandObjs}
          onChangeCommandTexts={onChangeCommandTexts}
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
          onUpdateTodo={onUpdateTodo}
          fontSize={`${todoFontSize}`}
          {...motionProps}
        />
      );
    }
  }
};

export const TodoItem = chakra(Component);
