import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import styled from "styled-components/macro";
import { Layout } from "../../components/Layout";
import { Task, TaskDescription, TaskHighlight, TaskItem, TaskItemStyle } from "../Dashboard/components/TaskList";
import {
  useParams
} from "react-router-dom";

export const TaskPage = () => {
  let { taskId }: any = useParams();
  const [task, setTask] = useState<Task>();

  const fetchTask = async function () {
    const taskRequest = await fetch(`/api/tasks/${taskId}`, {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <Layout>
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <div>
          <h2>{task?.name}</h2>
        </div>
      </div>
      <TaskItemStyle>
        <TaskDescription>{task?.description}</TaskDescription>
      </TaskItemStyle>
    </Layout>
  );
};
