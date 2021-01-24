import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { CompanyContext } from "../../company/companyContetx";

const PlaceDropdown = ({ funk }) => {
  const { places } = useContext(CompanyContext);
  return (
    <Form.Control
      size="sm"
      as="select"
      onClick={(e) => {
        funk(e.target.value);
      }}
    >
      <option>{"select Place"}</option>
      {!places || places.length > 0
        ? places.map((item) => {
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

export default PlaceDropdown;
