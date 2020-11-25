import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { SmallButton } from "../../../components/SmallButton";
import { DeleteButton } from "../../../components/DeleteButton";
import { Redirect, useHistory } from "react-router-dom";
import { msToHMS } from "../../../util/CalculateDate";

export type Label = {
  labelId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Tracking = {
  trackingId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  timeStart: Date;
  timeEnd: Date;
};

export type Task = {
  taskId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __labels__: Label[];
  __trackings__: Tracking[];
};



export const LabelList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;
  padding-left: 0;

  align-self: flex-end;
  display: flex;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #333;
  }
`;

export const LabelsSpan = styled.span`
  float: left;
  margin-right: 0.5rem;
`

export const TaskFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TaskItemStyle = styled.div`
  margin: 0;
  min-height: 9rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TaskHighlight} {
      display: block;
    }
  }
`;
export const TaskList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TaskItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;
export const TaskTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  float: left;
`;

export const TaskDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  margin-top: 2rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Label = styled.p` 
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem; 
`;

export const LabelItem = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
`;

export const TrackedTime = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem;
  clear: both;
`;


export const TaskValue = styled.span`
  white-space: nowrap;
`;
export type TaskItemProps = {
  task: Task;
  props: any;
  onChange: any;
  fetchTasks: () => void;
  onClick?: (task: Task) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  props,
  onChange,
  fetchTasks,
  onClick = () => { },
}) => {
  let history = useHistory();
  const { taskId, name, description, __labels__, __trackings__ } = task;
  const [timerStatus, setTimerStatus] = useState(false);


  const onClickDeleteButton = async function () {
    await fetch("/api/tasks/" + taskId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchTasks();
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


  return (
    <TaskItemStyle>
      <TaskHighlight />
      <TaskFlex onClick={() => {
        console.log(task);
        onClick(task);
      }}>
        <div>
          <TaskTitle>{name}</TaskTitle>
          <TaskDescription>{description}</TaskDescription>
          <Label>
            <LabelsSpan>Labels:</LabelsSpan>
            <LabelList>
              {__labels__ &&
                __labels__.map((label: Label) => {
                  return <li key={label.labelId}>{label.name}</li>;
                })}
            </LabelList>
          </Label>
          <TrackedTime>Total tracked time: {
            getDateDifference()
          }</TrackedTime>

        </div>
      </TaskFlex>
      <div>
        <SmallButton disabled={props.taskId.toString() == taskId || props.taskId.toString() == 0 ? false : true} onClick={() => {
          if (!timerStatus) onChange({ taskId: taskId, name: name });
          else onChange({ taskId: 0, name: "" });
          setTimerStatus(!timerStatus);
        }}>{timerStatus ? "cancel" : "Start timer"}</SmallButton>
        <DeleteButton onClick={() => {
          onClickDeleteButton();
        }}>Delete task</DeleteButton>
      </div>
    </TaskItemStyle>
  );
};
