import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React from "react";
import { TaskFontSizeProvider } from "../contexts/TaskFontSizeContext";
import { TasksContextProvider } from "../contexts/TasksContext";
import { theme } from "../theme";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <TasksContextProvider>
        <TaskFontSizeProvider>
          <Component {...pageProps} />
        </TaskFontSizeProvider>
      </TasksContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
