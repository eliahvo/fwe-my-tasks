import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { SelectInput } from "../../../components/SelectInput";

export const AddLabelForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch("/api/labels", {
      method: "POST",
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
        name="name"
        type="text"
        label="Name"
        onChange={fieldDidChange}
        autoComplete="off"
        required
      />
      

      <Button type="submit">Add label</Button>
    </form>
  );
};
