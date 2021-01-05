import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";

const CreateInput = ({
  placholder,
  handl,
  currentValue,
  available,
  type,
  count
}) => {
  const [values, setValue] = useState("");

  useEffect(() => {
    if (!values) {
      setValue(currentValue || "");
    }
  }, [setValue, currentValue, values]);

  useEffect(() => {
    setValue("");
  }, [count]);

  const handlChange = e => {
    handl(e.target.value);
    setValue(e.target.value);
  };
  return (
    <Form.Input
      style={{ width: "58%", fontSize: 12 }}
      placeholder={placholder}
      name="input"
      onChange={handlChange}
      value={values}
      disabled={available || false}
      type={type}
    />
  );
};
export default CreateInput;
