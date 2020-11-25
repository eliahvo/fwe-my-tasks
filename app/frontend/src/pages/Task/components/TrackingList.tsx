import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { SmallButton } from "../../../components/SmallButton";
import { DeleteButton } from "../../../components/DeleteButton";
import { Redirect } from "react-router-dom";
import { msToHMS } from "../../../util/CalculateDate";
import { Modal } from "../../../components/Modal";
import { EditTaskForm } from "./EditTaskForm";
import { EditTrackingForm } from "./EditTrackingForm";
import { testContext } from "../TaskPage";

export type Tracking = {
  trackingId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  timeStart: Date;
  timeEnd: Date;
};




export const TrackingSpan = styled.span`
  float: left;
  margin-right: 0.5rem;
`

export const TrackingFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TrackingHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TrackingItemStyle = styled.div`
  margin: 0;
  min-height: 9rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TrackingHighlight} {
      display: block;
    }
  }
`;
export const TrackingList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TrackingItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;
export const TrackingTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  float: left;
`;

export const TrackingDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  margin-top: 2rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;



export const TrackedTime = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem;
  clear: both;
`;

export type TrackingItemProps = {
  tracking: Tracking;
  fetchTask: () => {};
};




export const TrackingItem: React.FC<TrackingItemProps> = ({
  tracking,
  fetchTask,
}) => {
  const { trackingId, description, timeStart, timeEnd } = tracking;
  const [editTrackingVisible, setEditTrackingVisible] = useState(false);


  const onClickDeleteButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch("/api/trackings/" + trackingId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchTask();
  };

  return (
    <div>
      {editTrackingVisible && (
        <Modal
          title="Edit tracking"
          onCancel={() => {
            setEditTrackingVisible(false);
          }}
        >
          <EditTrackingForm tracking={tracking}
            afterSubmit={() => {
              setEditTrackingVisible(false);
            }}
          />
        </Modal>
      )}
      <TrackingItemStyle>
        <TrackingHighlight />
        <TrackingFlex>
          <div>
            <TrackingDescription>{description}</TrackingDescription>
            <p></p>
            <TrackingSpan>Start time: {timeStart}</TrackingSpan>
            <TrackingSpan>End time: {timeEnd}</TrackingSpan>
            <TrackedTime>Duration: {
              msToHMS(new Date(timeEnd).getTime() - new Date(timeStart).getTime())
            }</TrackedTime>

          </div>

        </TrackingFlex>
        <div>
          <SmallButton onClick={() => {
            setEditTrackingVisible(!editTrackingVisible);
          }}
          >Edit tracking</SmallButton>
          <DeleteButton onClick={onClickDeleteButton}>Delete task</DeleteButton>
        </div>
      </TrackingItemStyle>
    </div>
  );
};
