import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Task, Tracking } from "../../../pages/Dashboard/components/TaskList";

interface EditTrackingFormState {
  description: string;
  trackingId: number;
}

export const EditTrackingForm: React.FC<{ afterSubmit: () => void; tracking: Tracking; }> = ({
  afterSubmit,
  tracking,
}) => {
  
  const [values, setValues] = useState<EditTrackingFormState>(tracking);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        required
      />
      <Button type="submit">Save changes</Button>
    </form>
  );
};
