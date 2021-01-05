import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";

const CustomInput = ({
  placholder,
  handl,
  currentValue,
  available,
  type,
  width
}) => {
  const [values, setValue] = useState("");

  useEffect(() => {
    if (!values) {
      setValue(currentValue || "");
    }
  }, [setValue, currentValue, values]);

  const handlChange = e => {
    handl(e.target.value);
    setValue(e.target.value);
  };
  return (
    <Form.Input
      style={{ width: width || "58%", fontSize: 12 }}
      placeholder={placholder}
      // name="input"
      onChange={handlChange}
      value={values}
      disabled={available || false}
      type={type}
      required={true}
    />
  );
};
export default CustomInput;
