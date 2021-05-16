import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.700",
      },
    },
  },
  config: {
    initialColorMode: "dark",
  },
});
