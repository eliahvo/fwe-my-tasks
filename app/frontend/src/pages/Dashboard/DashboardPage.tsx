import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import styled from "styled-components/macro";
import { AddButton } from "./components/AddButton";
import { Task, TaskItem, TaskList } from "./components/TaskList";


export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async function () {
      const taskRequest = await fetch("/api/tasks", {
        headers: { "content-type": "application/json"},
      });
      console.log(taskRequest);
      if (taskRequest.status === 200) {
        const taskJSON = await taskRequest.json();
        setTasks(taskJSON.data);
      }
    })();
  }, []);

  return (
    <div>
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <div>
          <h2>Dashboard</h2>
          
        </div>
        <div
          css={`
            flex: 1;
            justify-content: flex-end;
            display: flex;
            align-items: top;
          `}
        >
          <AddButton />
        </div>
      </div>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem task={task}></TaskItem>
        ))}
      </TaskList>
    </div>
  );
};
