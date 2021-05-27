import { NextPage } from "next";
import React from "react";
import { todoAPI } from "../api/todo";
import { TodoApp } from "../components/TodoApp";

const Home: NextPage = () => {
  return <TodoApp todoApi={todoAPI} />;
};

export default Home;
