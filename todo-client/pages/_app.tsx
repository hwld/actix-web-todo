import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React from "react";
import { TasksContextProvider } from "../contexts/TasksContext";
import { theme } from "../theme";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <TasksContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </TasksContextProvider>
  );
};

export default MyApp;
