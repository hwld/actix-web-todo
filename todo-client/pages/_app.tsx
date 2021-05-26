import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import { theme } from "../theme";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContextProvider>
  );
};

export default MyApp;
