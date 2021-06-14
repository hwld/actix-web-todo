import { chakra, ChakraProps } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import React, { forwardRef } from "react";
import { Todo } from "../api/task";
import { Command, CommandInfo } from "../hooks/useCommandsInfo";
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
  commandInfos: CommandInfo[];
  getCommandText: (command: Command) => string;
} & Omit<
  GiveUpAllTodoItemProps &
    ChangeFontSizeTodoItemProps &
    ChangeCommandTextsTodoItemProps &
    CommonTaskItemProps,
  "task" | "onChangeChecked" | "defaultFontSize" | "defaultCommandInfos"
>;

const Component = forwardRef<HTMLDivElement, Props>(
  (
    { className, todoFontSize, commandInfos, getCommandText, ...others },
    ref
  ) => {
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
      case `\`${getCommandText("giveUpAll")}\``: {
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
            bgColor="blue.600"
          />
        );
      }
      case `\`${getCommandText("changeFontSize")}\``: {
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
            bgColor="blue.600"
          />
        );
      }
      case `\`${getCommandText("changeCommandText")}\``: {
        return (
          <ChangeCommandTextsTodoItem
            ref={ref}
            className={className}
            task={todo}
            onDeleteTask={onDeleteTask}
            onUpdateTodo={onUpdateTodo}
            defaultCommandInfos={commandInfos}
            onChangeCommandTexts={onChangeCommandTexts}
            fontSize={`${todoFontSize}`}
            bgColor="blue.600"
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

const ComponentWithChakra = chakra(motion(Component));

// motionとchakraに共通のtransition propsが存在する。
// motion factoryでラップして、transition以外のpropsをchakraコンポーネントに渡すことで
// chakraのtransitionは使えなくなるが、motionのtransitionを使えるようにする。
type TodoItemProps = Omit<Props & ChakraProps, keyof MotionProps> & MotionProps;
export const TodoItem = motion(
  forwardRef<HTMLDivElement, TodoItemProps>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { transition, ...rest } = props;
    return <ComponentWithChakra ref={ref} {...rest} />;
  })
);
