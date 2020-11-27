import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import styled from "styled-components/macro";
import { Layout } from "../../components/Layout";
import { Label, Task, LabelList, LabelsSpan, TaskFlex, TaskTitle, TaskItemStyle, TrackedTime, TaskHighlight, TaskList, Tracking } from "../Dashboard/components/TaskList";
import {
  useParams
} from "react-router-dom";
import { TrackingItem } from "./components/TrackingList";
import { msToHMS } from "../../util/CalculateDate";
import { EditButton } from "./components/EditButton";
import { Modal } from "../../components/Modal";
import { EditTaskForm } from "./components/EditTaskForm";
import { AddButton } from "../Dashboard/components/AddButton";
import { AddTrackingForm } from "./components/AddTrackingForm";
import { RoundButton } from "../../components/RoundButton";
import { AddLabelToTaskForm } from "./components/AddLabelToTaskForm";
import { DeleteLabelToTaskForm } from "./components/DeleteLabelFromTaskForm";

export const TaskDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  margin-top: 1rem;
`

export const StyledTask = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
`;

function test() {
  console.log("context");
}

export const testContext = React.createContext({});

export const TaskPage = () => {
  let { taskId }: any = useParams();
  const [task, setTask] = useState<Task>();
  const [editTaskVisible, setEditTaskVisible] = useState(false);
  const [addLabelToTaskVisible, setAddLabelToTaskVisible] = useState(false);
  const [deleteLabelToTaskVisible, setDeleteLabelToTaskVisible] = useState(false);
  const [addTrackingVisible, setAddTrackingVisible] = useState(false);

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

  const getDateDifference = function (): string {
    const ms = task?.__trackings__.reduce((prev: any, cur: any) => {
      const timeStart = new Date(cur.timeStart);
      const timeEnd = new Date(cur.timeEnd);
      const diff = (timeEnd.getTime() - timeStart.getTime());
      console.log(diff, timeEnd.getTime(), diff);

      return diff + prev;
    }, 0);

    return msToHMS(ms);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <Layout>
      <testContext.Provider value={test}>
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
        <div
          css={`
            flex: 1;
            justify-content: flex-end;
            display: flex;
            align-items: top;
          `}
        >
          <RoundButton name="Add label" onClick={() => {
            setAddLabelToTaskVisible(!addLabelToTaskVisible);
          }}
          />
          <RoundButton name="Delete label" onClick={() => {
            setDeleteLabelToTaskVisible(!deleteLabelToTaskVisible);
          }}
          />
          <EditButton onClick={() => {
            setEditTaskVisible(!editTaskVisible);
          }}
          />
        </div>
      </div>
      {addLabelToTaskVisible && (
        <Modal
          title="Add label"
          onCancel={() => {
            setAddLabelToTaskVisible(false);
          }}
        >
          <AddLabelToTaskForm taskId={task?.taskId!}
            afterSubmit={() => {
              fetchTask();
              setAddLabelToTaskVisible(false);
            }}
          />
        </Modal>
      )}
      {deleteLabelToTaskVisible && (
        <Modal
          title="Delete label"
          onCancel={() => {
            setDeleteLabelToTaskVisible(false);
          }}
        >
          <DeleteLabelToTaskForm taskId={task?.taskId!}
            afterSubmit={() => {
              fetchTask();
              setDeleteLabelToTaskVisible(false);
            }}
          />
        </Modal>
      )}
      {editTaskVisible && (
        <Modal
          title="Edit task"
          onCancel={() => {
            setEditTaskVisible(false);
          }}
        >
          <EditTaskForm task={task!}
            afterSubmit={() => {
              fetchTask();
              setEditTaskVisible(false);
            }}
          />
        </Modal>
      )}
      <StyledTask>
        <TaskItemStyle>
          <TaskFlex>
            <div>
              <TaskDescription>{task?.description}</TaskDescription>
              <Label>
                <LabelsSpan>Labels:</LabelsSpan>
                <LabelList>
                  {task?.labels &&
                    task?.labels.map((label: Label) => {
                      return <li key={label.labelId}>{label.name}</li>;
                    })}
                </LabelList>
              </Label>
              <TrackedTime>Total tracked time: {
                getDateDifference()
              }</TrackedTime>
            </div>

          </TaskFlex>
        </TaskItemStyle>
      </StyledTask>
      <div>
        <div
          css={`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
        >
          <div>
            <h2>Trackings</h2>
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
              setAddTrackingVisible(!addTrackingVisible);
            }}
            />
          </div>
        </div>
        {addTrackingVisible && (
        <Modal
          title="Add tracking"
          onCancel={() => {
            setAddTrackingVisible(false);
          }}
        >
          <AddTrackingForm task={task!}
            afterSubmit={() => {
              fetchTask();
              setAddTrackingVisible(false);
            }}
          />
        </Modal>
      )}
        <TaskList>
          {task?.__trackings__.map((tracking) => (
            <TrackingItem tracking={tracking} fetchTask={fetchTask}></TrackingItem>
          ))}
        </TaskList>
      </div>
      </testContext.Provider>
    </Layout>
  );
};
