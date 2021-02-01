import React, { useState, useContext } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { CompanyContext } from "../companyContetx";
import CustomInput from "../../comonComponents/CustomInput";
import funcTypes from "../funcTypes/obsFunc";

const ObservationHeader = () => {
  const { obsFunctions } = useContext(CompanyContext);

  return (
    <div>
      <Row style={{ marginTop: "2%", marginBottom: "2%", marginLeft: "14%" }}>
        <Col xs={9}>
          <h1>Observation types</h1>
        </Col>
        <Col style={{ marginTop: "1%", marginLeft: "-1%" }}>
          <Button
            variant="warning"
            size="sm"
            onClick={() => obsFunctions({ type: funcTypes.obsCreateModal })}
          >
            Create
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ObservationHeader;
