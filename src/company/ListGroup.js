import React, { useState, useContext } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { CompanyContext } from "./companyContetx";
const Listgroup = () => {
  const { companyFunctions, activePage } = useContext(CompanyContext);
  return (
    <Container>
      <div style={{ marginTop: "2%" }}>
        <ListGroup horizontal="sm">
          <ListGroup.Item
            action
            onClick={() =>
              companyFunctions({ type: "setActivePage", payload: 1 })
            }
            active={activePage === 1}
          >
            Places
          </ListGroup.Item>
          <ListGroup.Item
            action
            onClick={() =>
              companyFunctions({ type: "setActivePage", payload: 2 })
            }
            active={activePage === 2}
          >
            Observation types
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};
export default Listgroup;
