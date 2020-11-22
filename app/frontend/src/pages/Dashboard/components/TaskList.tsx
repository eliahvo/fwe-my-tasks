import React from "react";
import styled from "styled-components";

export type Label = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Tracking = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  timeStart: Date;
  timeEnd: Date;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  labels: Label[];
};



const LabelList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;

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

const TaskFlex = styled.div`
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
  padding-top: 2rem;
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
`;

export const Buttons = styled.p`
`;


export const TaskValue = styled.span`
  white-space: nowrap;
`;
export type TaskItemProps = {
  task: Task;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task: {name, description, labels},
}) => {
  return (
    <TaskItemStyle>
      <TaskHighlight />
      <TaskFlex>
          <div>
            <TaskTitle>{name}</TaskTitle>
            <TaskDescription>{description}</TaskDescription>
            <Label>
              Labels:
            </Label>
            <TrackedTime>Total tracked time:</TrackedTime>
              
          </div>
          <LabelList>
          {labels &&
            labels.map((label: Label) => {
              return <li key={label.id}>{label.id}</li>;
            })}
        </LabelList>
      </TaskFlex>
    </TaskItemStyle>
  );
};
