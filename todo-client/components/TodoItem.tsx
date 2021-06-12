import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { forwardRef } from "react";
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
    ChangeFontSizeTodoItemProps &
    ChangeCommandTextsTodoItemProps &
    CommonTaskItemProps,
  "task" | "onChangeChecked" | "defaultFontSize" | "defaultCommandTexts"
>;

const Component = forwardRef<HTMLDivElement, Props>(
  ({ className, todoFontSize, commandObjs, ...others }, ref) => {
    const {
      todo,
      allTodos,
      onDeleteTask,
      onDeleteMultiple,
      onUpdateTodo,
      onChangeFontSize,
      onChangeCommandTexts,
    } = others;

    switch (todo.title) {
      case `\`${commandObjs.giveUpAll.text}\``: {
        return (
          <GiveUpAllTodoItem
            ref={ref}
            className={className}
            task={todo}
            allTodos={allTodos}
            onDeleteTask={onDeleteTask}
            onDeleteMultiple={onDeleteMultiple}
            onUpdateTodo={onUpdateTodo}
            // 直接渡せない
            fontSize={`${todoFontSize}`}
          />
        );
      }
      case `\`${commandObjs.changeFontSize.text}\``: {
        return (
          <ChangeFontSizeTodoItem
            ref={ref}
            className={className}
            defaultFontSize={todoFontSize}
            task={todo}
            onDeleteTask={onDeleteTask}
            onUpdateTodo={onUpdateTodo}
            onChangeFontSize={onChangeFontSize}
            fontSize={`${todoFontSize}`}
          />
        );
      }
      case `\`${commandObjs.changeCommandObjs.text}\``: {
        return (
          <ChangeCommandTextsTodoItem
            ref={ref}
            className={className}
            task={todo}
            onDeleteTask={onDeleteTask}
            onUpdateTodo={onUpdateTodo}
            defaultCommandTexts={commandObjs}
            onChangeCommandTexts={onChangeCommandTexts}
            fontSize={`${todoFontSize}`}
          />
        );
      }
      default: {
        return (
          <CommonTaskItem
            ref={ref}
            className={className}
            task={todo}
            onDeleteTask={onDeleteTask}
            onUpdateTodo={onUpdateTodo}
            fontSize={`${todoFontSize}`}
          />
        );
      }
    }
  }
);

export const TodoItem = chakra(motion(Component));
