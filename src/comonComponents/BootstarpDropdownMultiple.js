import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const BootstrapDropdownMultiple = ({ value, funk }) => {
  return (
    <Form.Control as="select" multiple onClick={(e) => funk(e.target.value)}>
      {value.map((item) => {
        return <option>{item}</option>;
      })}
    </Form.Control>
  );
};

export default BootstrapDropdownMultiple;
