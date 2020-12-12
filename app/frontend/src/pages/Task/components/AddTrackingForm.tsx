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

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (format.test(e.target.value)) {
      alert("special character are not allowed!");
      e.target.value = "";
    } else {
      setTracking({ ...tracking, [e.target.name]: e.target.value });
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tracking);

    /** 
     * post tracking to database
     */
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
        autoComplete="off"
        required
      />
      <Button type="submit" data-testid="addTrackingToTask">Save changes</Button>
    </form>
  );
};
