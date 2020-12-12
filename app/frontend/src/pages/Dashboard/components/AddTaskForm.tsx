import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (format.test(e.target.value)) {
      alert("special character are not allowed!");
      e.target.value = "";
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    //posting new task to database
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
      }),
    });
    afterSubmit();
  };
  return (
    <form onSubmit={onSubmitForm} data-testid="add-task-form">
      <Input
        name="name"
        type="text"
        label="Name"
        onChange={fieldDidChange}
        autoComplete="off"
        required
      />
      <Input
        name="description"
        label="Description"
        type="text"
        onChange={fieldDidChange}
        autoComplete="off"
        required
      />
      <Button type="submit">Add new task</Button>
    </form>
  );
};
