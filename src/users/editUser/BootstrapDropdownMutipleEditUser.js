import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const BootstrapDropdownMultipleEditUSer = ({ currentValue, funk }) => {
  return (
    <Form.Control as="select" multiple onClick={(e) => funk(e.target.value)}>
      {currentValue || currentValue.length > 0
        ? currentValue.map((item) => {
            return <option>{item}</option>;
          })
        : ""}
      ;
    </Form.Control>
  );
};

export default BootstrapDropdownMultipleEditUSer;
