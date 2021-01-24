import React, { useContext } from "react";
import { Form } from "react-bootstrap";

const PriorityDropdown = ({ funk }) => {
  return (
    <Form.Control
      size="sm"
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{"select Priority"}</option>
      <option value={"Low"}>Low</option>
      <option value={"High"}>High</option>
      <option value={"High"}>Very High</option>
    </Form.Control>
  );
};

export default PriorityDropdown;
