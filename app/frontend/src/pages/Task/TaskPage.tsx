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
import { AddTaskForm } from "../Dashboard/components/AddTaskForm";
import { EditTaskForm } from "./components/EditTaskForm";
import { AddButton } from "../Dashboard/components/AddButton";
import { AddTrackingForm } from "./components/AddTrackingForm";

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

export const TaskPage = () => {
  let { taskId }: any = useParams();
  const [task, setTask] = useState<Task>();
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  const [editTaskVisible, setEditTaskVisible] = useState(false);
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
          <EditButton onClick={() => {
            setEditTaskVisible(!editTaskVisible);
          }}
          />
        </div>
      </div>
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
                  {task?.__labels__ &&
                    task?.__labels__.map((label: Label) => {
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
            <TrackingItem tracking={tracking}></TrackingItem>
          ))}
        </TaskList>
      </div>
    </Layout>
  );
};
