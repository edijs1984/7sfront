import React from "react";
import { Form } from "react-bootstrap";

const BootstrapDropdown = ({ value, funk }) => {
  return (
    <Form.Control
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{"Select Group"}</option>
      {value || value.length > 0
        ? value.map((item) => {
            return (
              <option key={item._id} value={item.family}>
                {item.family}
              </option>
            );
          })
        : ""}
    </Form.Control>
  );
};

export default BootstrapDropdown;
