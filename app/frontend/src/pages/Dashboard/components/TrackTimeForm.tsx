import React, { useState, ChangeEvent, useEffect } from "react";
import { FloatedInput } from "../../../components/FloatedInput";
import { RoundedButton } from "../../../components/Button";
import styled from "styled-components";
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


export const TrackTimeForm: React.FC<{ afterSubmit: () => void; task: any; fetchTasks: () => void }> = ({
  afterSubmit,
  fetchTasks,
  task,
}) => {
  let tracking: Tracking = { description: "", timeStart: new Date().toString(), timeEnd: "", taskId: task.taskId };
  const [values, setValues] = useState<TrackTimeFormState>(tracking);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(false);

  var startDate = new Date(values.timeStart);
  if (localStorage.getItem("trackingStartDateLS") == "" || localStorage.getItem("trackingStartDateLS") == null) {
    startDate = new Date();
    localStorage.setItem("trackingStartDateLS", JSON.stringify(startDate.toString()));
  } else {
    startDate = new Date(localStorage.getItem("trackingStartDateLS")!);
  }

  /**
   * returns date difference from startDate and current date to form "XX:XX:XX"
   */
  const getDateDifference = function (): string {
    const actualDate = new Date();
    const ms = (actualDate.getTime() - startDate.getTime());

    return msToHMS(ms - (ms % 1000));
  }

  const [time, setTime] = useState(getDateDifference());


  useEffect(() => {
    if (localStorage.getItem("trackingPauseLS") == "" || localStorage.getItem("trackingPauseLS") == null) {
      localStorage.setItem("trackingPauseLS", "false");
    } else {
      setPause(localStorage.getItem("trackingPauseLS") == "true" ? true : false);
    }

    if (!(localStorage.getItem("trackingDescriptionLS") == "" || localStorage.getItem("trackingDescriptionLS") == null)) {
      values.description = localStorage.getItem("trackingDescriptionLS")!;
    }
  }, []);

  useEffect(() => {
    //eslint-disable-next-line
    const timer = setTimeout(() => {
      if (!pause) setTime(getDateDifference());
      else setTime("00:00:00");
    }, 1000);
  });

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name == "description") {
      localStorage.setItem("trackingDescriptionLS", e.target.value);
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("onsubmitformpause: ", pause);
    e.preventDefault();
    values.timeEnd = new Date().toString();

    if (pause || stop) {
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
        const startDate = new Date().toString();
        setValues({ description: values.description, timeStart: startDate, timeEnd: values.timeEnd, taskId: values.taskId });
        localStorage.setItem("trackingStartDateLS", JSON.stringify(startDate.toString()));
        localStorage.setItem("trackingPauseLS", "false");
        console.log("1");
      } else {
        fetchTasks();
        localStorage.setItem("trackingPauseLS", "true");
        console.log("2");
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
          value={localStorage.getItem("trackingDescriptionLS")!}
          autoComplete="off"
        />
        <H2Styled>{time}</H2Styled>
        <RoundedButton data-testid="stop-button" type="submit" disabled={pause} onClick={() => {
          if (values.description !== "") {
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
          if (values.description !== "") {
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