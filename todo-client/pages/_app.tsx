import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { theme } from "../theme";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
