import React, { useState, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import UserDropdown from "../../comonComponents/dropdowns/userDropdown";
import { CompanyContext } from "../companyContetx";
import CustomInput from "../../comonComponents/CustomInput";
import placeTypes from "../funcTypes/placeFunc";

const PlacesHeader = () => {
  const { placeFunctions } = useContext(CompanyContext);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [responsible, setResponsible] = useState("");

  const submit = (e) => {
    e.preventDefault();
    placeFunctions({
      type: placeTypes.createPlace,
      payload: {
        placeName: newPlaceName,
        responsible: responsible.value,
      },
    });
    setNewPlaceName("");
    setResponsible("");
  };
  return (
    <div
      style={{
        marginBottom: "2%",

        marginTop: "5%",
      }}
    >
      <Form onSubmit={submit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label style={{ fontSize: 36, marginTop: "3%" }}>
              Places
            </Form.Label>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Place name</Form.Label>
            <CustomInput
              value={newPlaceName}
              onChange={(e) => setNewPlaceName(e)}
              placeholder={"Enter place name"}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="2">
            <Form.Label>Responsible</Form.Label>
            <UserDropdown
              placeholder={"Select user"}
              onChange={(e) => setResponsible(e)}
              valueSelected={responsible}
            />
          </Form.Group>
          <Col xs="auto" style={{ marginTop: "2.5%" }}>
            <Button type="submit" className="mb-2">
              Create
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default PlacesHeader;
