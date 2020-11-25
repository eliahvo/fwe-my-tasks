import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Task } from "../../../pages/Dashboard/components/TaskList";

interface AddTrackingFormState {
  taskId: string;
  name: string;
  description: string;
  timeStart: string;
  timeEnd: string;
}

export const AddTrackingForm: React.FC<{ afterSubmit: () => void; task: Task; }> = ({
  afterSubmit,
  task,
}) => {
  const [tracking, setTracking] = useState({
    description: "",
    taskId: task.taskId,
    timeStart: new Date().toString(),
    timeEnd: new Date().toString(),
  });

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTracking({ ...tracking, [e.target.name]: e.target.value });
  };
  
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tracking);

    await fetch(`/api/trackings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...tracking,
      }),
    });
    afterSubmit();
  };
  
  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="description"
        type="text"
        label="Description"
        onChange={fieldDidChange}
        required
      />
      <Button type="submit">Save changes</Button>
    </form>
  );
};
