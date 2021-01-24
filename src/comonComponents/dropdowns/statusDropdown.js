import React, { useContext } from "react";
import { Form } from "react-bootstrap";

const StatusDropdown = ({ funk }) => {
  return (
    <Form.Control
      size="sm"
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{"select Status"}</option>
      <option value={"New"}>New</option>
      <option value={"Updated"}>Updated</option>
      <option value={"Done"}>Done</option>
      <option value={"Approved Done"}>Approved Done</option>
    </Form.Control>
  );
};

export default StatusDropdown;
