import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const FilterForm: React.FC<{ afterSubmit: () => void; filter: any; setFilter: any}> = ({
  afterSubmit,
  filter,
  setFilter,
}) => {
  const [values, setValues] = useState({labels: "", taskName: "", taskDescription: ""});

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await setFilter(values);
    console.log("onsubmitForm: ", filter, " | values: ", values);
    afterSubmit();
  };
  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name="labels"
        type="text"
        label="Enter labels like 'label1; label2...'"
        onChange={fieldDidChange}
        autoComplete="off"
      />
      <Input
        name="taskName"
        type="text"
        label="Task name"
        onChange={fieldDidChange}
        autoComplete="off"
      />
      <Input
        name="taskDescription"
        type="text"
        label="Task description"
        onChange={fieldDidChange}
        autoComplete="off"
      />
      <Button type="submit">Save changes</Button>
    </form>
  );
};
