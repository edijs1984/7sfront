import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const BootstrapDropdownMultipleEditUSer = ({ currentValue, funk, value }) => {
  return (
    <Form.Control as="select" multiple onClick={(e) => funk(e.target.value)}>
      {currentValue.map((item) => {
        return <option>{item} "existing"</option>;
      })}
      {value.map((item) => {
        return <option>{item}</option>;
      })}
    </Form.Control>
  );
};

export default BootstrapDropdownMultipleEditUSer;
