import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Task, Tracking } from "../../../pages/Dashboard/components/TaskList";

interface EditTrackingFormState {
  description: string;
  trackingId: number;
  timeStart: Date;
  timeEnd: Date;
}

export const EditTrackingForm: React.FC<{ afterSubmit: () => void; tracking: Tracking; fetchTask: () => {}}> = ({
  afterSubmit,
  tracking,
  fetchTask,
}) => {

  const [values, setValues] = useState<EditTrackingFormState>(tracking);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    //check if datetype is valid
    if (e.target.name == "timeStart" || e.target.name == "timeEnd") {
      const date = new Date(e.target.value);
      if(!isNaN(date.getTime())) {
        
      }
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch(`/api/trackings/${values.trackingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
    });
    fetchTask();
    afterSubmit();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        value={values.description}
        autoComplete="off"
        required
      />
      <Input
        name="timeStart"
        label="Time start"
        type="text"
        onChange={fieldDidChange}
        value={values.timeStart.toString()}
        autoComplete="off"
        required
      />
      <Input
        name="timeEnd"
        label="Time End"
        type="text"
        onChange={fieldDidChange}
        value={values.timeEnd.toString()}
        autoComplete="off"
        required
      />
      <Button type="submit">Save changes</Button>
    </form>
  );
};
