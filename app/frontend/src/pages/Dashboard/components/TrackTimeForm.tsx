import React, { useState, ChangeEvent, useEffect } from "react";
import { FloatedInput } from "../../../components/FloatedInput";
import { RoundedButton } from "../../../components/Button";
import styled, { css } from "styled-components";
import { msToHMS } from "../../../util/CalculateDate";

export const TrackerStyled = styled.div`
  padding: 0.5rem;
`;

export const H2Styled = styled.h2`
  color: #000000;
  float: left;
  margin-right: 0.5rem;
`;

export type Tracking = {
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

export const TrackTimeForm: React.FC<{ afterSubmit: () => void; task: any; }> = ({
  afterSubmit,
  task,
}) => {
  let tracking: Tracking = { description: "", timeStart: new Date().toString(), timeEnd: "", taskId: task.taskId };
  const [values, setValues] = useState<TrackTimeFormState>(tracking);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(false);

  const startDate = new Date(values.timeStart);


  console.log("startTIme: ", startDate);


  const getDateDifference = function (): string {
    const actualDate = new Date();
    const ms = (actualDate.getTime() - startDate.getTime());

    return msToHMS(ms - (ms % 1000));
  }

  const [time, setTime] = useState(getDateDifference());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!pause) setTime(getDateDifference());
    }, 1000);
  });

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(pause);
    e.preventDefault();
    values.timeEnd = new Date().toString();
    console.log("onSubmitForm: ", values);

    if (pause || stop) {
      console.log("post tracking");
      await fetch(`/api/trackings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
        }),
      });
    }
    if (!stop) {
      if (!pause) {
        setValues({ description: values.description, timeStart: new Date().toString(), timeEnd: values.timeEnd, taskId: values.taskId });
        //startDate = new Date(values.timeStart);
      } else {
      }
    } else {
      afterSubmit();
    }
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
          autoComplete="off"
        />
        <H2Styled>{time}</H2Styled>
        <RoundedButton type="submit" disabled={pause} onClick={() => {
          if (values.description != "") {
            setStop(true);
          }
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24">
            <rect width="100" height="100" />
          </svg>
        </RoundedButton>
        <RoundedButton type="submit" onClick={() => {
          console.log("pause clicked");
          if (values.description != "") {
            setPause(!pause);
          }
        }}>
          {pause ?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <polygon fill="black" points="5,20 5,0 20,10" />
            </svg>
            :
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <rect width="5" x="5" height="100" />
              <rect width="5" x="15" height="100" />
            </svg>
          }
        </RoundedButton>
      </form>
    </TrackerStyled>
  );
};

/*
<StopButton type="submit"></StopButton>
        <PauseButton type="submit" onClick={() => {
          console.log("pause clicked");
          setPause(true);
        }}></PauseButton>
*/