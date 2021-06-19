import { chakra, ChakraProps } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import React, { forwardRef } from "react";
import { Todo } from "../api/task";
import { Command, CommandInfo } from "../hooks/useCommandsInfo";
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
    { className, commandInfos, getCommandText, todo, onChangeCommandTexts },
    ref
  ) => {
    switch (todo.title) {
      case `\`${getCommandText("giveUpAll")}\``: {
        return (
          <GiveUpAllTodoItem
            ref={ref}
            className={className}
            task={todo}
            bgColor="blue.600"
          />
        );
      }
      case `\`${getCommandText("changeFontSize")}\``: {
        return (
          <ChangeFontSizeTodoItem
            ref={ref}
            className={className}
            task={todo}
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
            defaultCommandInfos={commandInfos}
            onChangeCommandTexts={onChangeCommandTexts}
            bgColor="blue.600"
          />
        );
      }
      default: {
        return <CommonTaskItem ref={ref} className={className} task={todo} />;
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
