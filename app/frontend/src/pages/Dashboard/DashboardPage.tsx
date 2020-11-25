import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import styled from "styled-components/macro";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import { AddButton } from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";
import { StyledFooter } from "./components/StyledFooter";
import { Task, TaskItem, TaskList } from "./components/TaskList";
import { useHistory } from "react-router-dom";
import { TrackTimeForm } from "./components/TrackTimeForm";
import { PauseButton } from "../../components/PauseButton";

export const DashboardPage = () => {
  let history = useHistory();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [currentTaskTimer, setCurrentTaskTimer] = useState({taskId: 0, name: ""});


  const fetchTasks = async function () {
    const taskRequest = await fetch("/api/tasks", {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTasks(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchTasks();
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
          <AddButton onClick={() => {
            setAddTaskVisible(!addTaskVisible);
          }}
          />
        </div>
      </div>
      {addTaskVisible && (
        <Modal
          title="Add task"
          onCancel={() => {
            setAddTaskVisible(false);
          }}
        >
          <AddTaskForm
            afterSubmit={() => {
              setAddTaskVisible(false);
              fetchTasks();
            }}
          />
        </Modal>
      )}

      <TaskList>
        {tasks.map((task) => (
          <TaskItem onClick={() => {
            history.push(`/tasks/${task.taskId}`);
          }} task={task} props={currentTaskTimer} onChange={setCurrentTaskTimer}></TaskItem>
        ))}
      </TaskList>

      {currentTaskTimer.taskId && (
        <StyledFooter>
          <TrackTimeForm task={currentTaskTimer}
            afterSubmit={() => {
            }}></TrackTimeForm>
        </StyledFooter>
      )}
    </Layout>
  );
};
