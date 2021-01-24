import React from "react";
import { Form } from "react-bootstrap";

const UserDropdown = ({ value, funk, tx }) => {
  return (
    <Form.Control
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{tx ? tx : "Select Responsible"}</option>
      {value || value.length > 0
        ? value.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })
        : ""}
    </Form.Control>
  );
};

export default UserDropdown;
