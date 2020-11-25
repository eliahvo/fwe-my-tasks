import React, { useState, ChangeEvent } from "react";
import { FloatedInput } from "../../../components/FloatedInput";
import { Button } from "../../../components/Button";
import { Task } from "./TaskList";
import { PauseButton } from "../../../components/PauseButton";
import { StopButton } from "../../../components/StopButton";
import styled, { css } from "styled-components";

export const TrackerStyled = styled.div`
  padding: 0.5rem;
`;

export const H2Styled = styled.h2`
  color: #000000;
  float: left;
  margin-right: 0.5rem;
`;

export type Tracking = {
  trackingId: number;
  description: string;
  timeStart: string;
  timeEnd: string;
  taskId: string;
};


interface TrackTimeFormState {
  taskId: string;
  description: string;
  timeStart: string;
  timeEnd: string;
}

export const TrackTimeForm: React.FC<{ afterSubmit: () => void; task: any }> = ({
  afterSubmit,
  task
}) => {
  let tracking: Tracking = null!;
  const [values, setValues] = useState<TrackTimeFormState>(tracking);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch(`/api/trackings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
    });
    afterSubmit();
  };

  return (
    <TrackerStyled>
      <form onSubmit={onSubmitForm}>
        <H2Styled>{task.name}</H2Styled>
        <FloatedInput
          name="description"
          label="What do you do?"
          type="text"
          onChange={fieldDidChange}
          required
        />
        <H2Styled>Time</H2Styled>
        <StopButton type="submit"></StopButton>
        <PauseButton type="button"></PauseButton>
      </form>
    </TrackerStyled>
  );
};
