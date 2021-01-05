import React from "react";
import { Form } from "semantic-ui-react";

const CustomInputObject = ({ handl }) => {
  const handlChange = e => {
    handl(e.target.value);
  };
  return (
    <Form.Input
      style={{ width: "100%", fontSize: 12 }}
      placeholder={""}
      name="input"
      onChange={handlChange}
    />
  );
};
export default CustomInputObject;
