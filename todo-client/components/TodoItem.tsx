import { chakra } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../api/task";
import { AllCommandObjs } from "../hooks/useCommandObjs";
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
  commandObjs: AllCommandObjs;
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
    case `\`${commandObjs.giveUpAll.text}\``: {
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
    case `\`${commandObjs.changeFontSize.text}\``: {
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
    case `\`${commandObjs.changeCommandObjs.text}\``: {
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
