import { Box, chakra, Heading, Text } from "@chakra-ui/react";
import React from "react";

type Props = { className?: string };

const Component: React.FC<Props> = ({ className }) => {
  return (
    <Box px={4} pt={10} className={className}>
      <Box
        w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
        textAlign={{ base: "left", md: "center" }}
        mx="auto"
      >
        <Heading
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight={{ base: "bold", md: "extrabold" }}
          color="gray.100"
          lineHeight="shorter"
        >
          Actix-Web TodoList
        </Heading>
        <Text
          mt={3}
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.500"
          lineHeight="base"
        >
          actix-webとreactを使用したtodoリスト。
          <br />
          バックエンドではdieselを使ってコネクションプールからsqliteに接続する。
          <br />
          フロントエンドではfetchを使ってapiサーバと通信する。
        </Text>
      </Box>
    </Box>
  );
};

export const Header = chakra(Component);
