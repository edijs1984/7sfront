import React from "react";

import { Button, Row, Col, Container } from "react-bootstrap";

import {
  FaQuestion,
  FaLocationArrow,
  FaUserAlt,
  FaListAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";
const Settings = () => {
  const cardStyle = {
    textAlign: "center",
    backgroundColor: "#2f3c48",
    color: "white",
    border: "none",
    borderRadius: 1,
  };

  const btnStyle = {
    width: "80%",
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row style={{ marginTop: "10%" }}>
          <Col>
            <Button size="lg" as={Link} to="/Places" style={btnStyle}>
              <h2>Places</h2>
              <FaLocationArrow size="30%" />
            </Button>
          </Col>
          <Col>
            <Button size="lg" as={Link} to="/obstypes" style={btnStyle}>
              <h2>Observation types</h2>
              <FaQuestion size="23%" />
            </Button>
          </Col>
          <Col>
            <Button size="lg" as={Link} to="/user/create" style={btnStyle}>
              <h2>Users</h2>
              <FaUserAlt size="31%" />
            </Button>
          </Col>
          <Col>
            <Button size="lg" as={Link} to="/auditrulles" style={btnStyle}>
              <h2>Audit rulles</h2>
              <FaListAlt size="31%" />
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Settings;
