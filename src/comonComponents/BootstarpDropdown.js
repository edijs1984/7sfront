import React from "react";
import { Form } from "react-bootstrap";

const BootstrapDropdown = ({ currentValue, value, funk }) => {
  return (
    <Form.Control as="select" onClick={(e) => funk(e.target.value)}>
      <option>{currentValue ? currentValue : "Select Place"}</option>
      {value || value.length > 0
        ? value.map((item) => {
            return <option key={item._id}>{item.departmentName}</option>;
          })
        : ""}
    </Form.Control>
  );
};

export default BootstrapDropdown;
