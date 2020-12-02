import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import styled from "styled-components/macro";
import { Layout } from "../../components/Layout";
import { Modal } from "../../components/Modal";
import { AddButton } from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";
import { StyledFooter } from "./components/StyledFooter";
import { Label, LabelList, Task, TaskItem, TaskList } from "./components/TaskList";
import { useHistory } from "react-router-dom";
import { TrackTimeForm } from "./components/TrackTimeForm";
import { RoundButton } from "../../components/RoundButton";
import { AddLabelForm } from "./components/AddLabelForm";
import { DeleteLabelForm } from "./components/DeleteLabelForm";
import { FilterForm } from "./components/FilterForm";


export const ShowLabelsStyled = styled.div`
  width: 100%;
  background-color: #ffffff;
  max-width: 810px;   
  border-radius: 5px;
  border-color: #000000;
  border-width: 2px;
  border-style: solid;
  padding: 0.5rem;
  overflow: auto;
  padding-top: 0;
  padding-bottom: 1rem;
`;

export const DashboardPage = () => {
  let history = useHistory();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [addLabelVisible, setAddLabelVisible] = useState(false);
  const [deleteLabelVisible, setDeleteLabelVisible] = useState(false);
  const [labels, setLabels] = useState<Label[]>();
  const [filter, setFilter] = useState({ labels: "", taskName: "", taskDescription: "" });
  const [filterState, setFilterState] = useState(false);
  const [currentTaskTimer, setCurrentTaskTimer] = useState({ taskId: 0, name: "" });

  const fetchTasks = async function () {
    console.log("fetching tasks");
    const taskRequest = await fetch(`/api/tasks?labelFilter=${filter.labels}&taskNameFilter=${filter.taskName}&taskDescriptionFilter=${filter.taskDescription}`, {
      headers: { "content-type": "application/json" },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTasks(taskJSON.data);
    }
  };

  const fetchLabels = async function () {
    const taskRequest = await fetch("/api/labels/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setLabels(taskJSON.data);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    fetchLabels();
    fetchTasks();
    if(localStorage.getItem("currentTaskTimerLS")) {
      setCurrentTaskTimer(JSON.parse(localStorage.getItem("currentTaskTimerLS")!));
    }
  }, []);


  useEffect(() => {
    if (filter) {
      fetchTasks();
    }
  }, [filter])


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
          <RoundButton name="Change filter" onClick={() => {
            setFilterState(!filterState);
          }}
          />
          <RoundButton name="Create label" onClick={() => {
            setAddLabelVisible(!addLabelVisible);
          }}
          />
          <RoundButton name="Delete label" onClick={() => {
            setDeleteLabelVisible(!deleteLabelVisible);
          }}
          />
          <AddButton onClick={() => {
            setAddTaskVisible(!addTaskVisible);
          }}
          />
        </div>
      </div>
      {filterState && (
        <Modal
          title="Change filter"
          onCancel={() => {
            setFilterState(false);
          }}
        >
          <FilterForm filter={filter} setFilter={setFilter}
            afterSubmit={() => {
              setFilterState(false);
            }}
          />
        </Modal>
      )}
      {addLabelVisible && (
        <Modal
          title="Add label"
          onCancel={() => {
            setAddLabelVisible(false);
          }}
        >
          <AddLabelForm
            afterSubmit={() => {
              setAddLabelVisible(false);
              fetchLabels();
            }}
          />
        </Modal>
      )}
      {deleteLabelVisible && (
        <Modal
          title="Delete label"
          onCancel={() => {
            setDeleteLabelVisible(false);
          }}
        >
          <DeleteLabelForm
            afterSubmit={() => {
              setDeleteLabelVisible(false);
              fetchLabels();
            }}
          />
        </Modal>
      )}
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

      <ShowLabelsStyled>
        <LabelList>
          {labels &&
            labels.map((label: Label) => {
              return <li key={label.labelId}>{label.name}</li>;
            })}
        </LabelList>
      </ShowLabelsStyled>

      <TaskList>
        {tasks.map((task) => {
          return printTaskItem(history, task, currentTaskTimer, setCurrentTaskTimer, fetchTasks)
        })}
      </TaskList>

      {currentTaskTimer.taskId !== 0 && (
        <StyledFooter>
          <TrackTimeForm task={currentTaskTimer} fetchTasks={fetchTasks}
            afterSubmit={() => {
              setCurrentTaskTimer({ taskId: 0, name: "" });
              localStorage.setItem("currentTaskTimerLS", JSON.stringify({ taskId: 0, name: "" }));
              localStorage.setItem("trackingStartDateLS", "");
              localStorage.setItem("trackingDescriptionLS", "");
              fetchTasks();
            }}></TrackTimeForm>
        </StyledFooter>
      )}
    </Layout>
  );
};
function printTaskItem(history: any, task: Task, currentTaskTimer: { taskId: number; name: string; }, setCurrentTaskTimer: React.Dispatch<React.SetStateAction<{ taskId: number; name: string; }>>, fetchTasks: () => Promise<void>): JSX.Element | undefined {
  return (
    <TaskItem onClick={() => {
      history.push(`/tasks/${task.taskId}`);
    }} task={task} props={currentTaskTimer} onChange={setCurrentTaskTimer} fetchTasks={fetchTasks}>
    </TaskItem>
  );
}

