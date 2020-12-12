import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const AddLabelForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
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

    //posting new label to database
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
      <Button type="submit" data-testid="addLabel">Add label</Button>
    </form>
  );
};
