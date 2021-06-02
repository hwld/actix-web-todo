import { NextPage } from "next";
import React from "react";
import { taskAPI } from "../api/task";
import { TaskApp } from "../components/TaskApp";

const Home: NextPage = () => {
  return <TaskApp taskApi={taskAPI} />;
};

export default Home;
