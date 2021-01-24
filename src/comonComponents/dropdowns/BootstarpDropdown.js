import React from "react";
import { Form } from "react-bootstrap";

const BootstrapDropdown = ({ value, funk, cv }) => {
  return (
    <Form.Control
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{cv ? cv : "Select Place"}</option>
      {value || value.length > 0
        ? value.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.placeName}
              </option>
            );
          })
        : ""}
    </Form.Control>
  );
};

export default BootstrapDropdown;
