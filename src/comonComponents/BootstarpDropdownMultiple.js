import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../config.json";

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
