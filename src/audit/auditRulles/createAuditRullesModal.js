import React, { useContext, useEffect, useState } from "react";
import { AuditContext } from "../auditContext";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import FiveSDropdown from "./fiveSDropdown";
import CustomInput from "../../comonComponents/CustomInput";

const CreateAuditRullesModal = () => {
  const { auditFunctions, createModal } = useContext(AuditContext);
  const [rulles, setRulles] = useState({
    issue: "",
    inspectable: "",
    point1: "",
    rulle1: "",
    point2: "",
    rulle2: "",
    point3: "",
    rulle3: "",
    family: "",
  });

  const clearData = () => {
    setRulles({
      issue: "",
      inspectable: "",
      point1: "",
      rulle1: "",
      point2: "",
      rulle2: "",
      point3: "",
      rulle3: "",
      family: "",
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    auditFunctions({ type: "createRulle", payload: rulles });
    clearData();
  };

  const disabledSubmit = rulles.family === "" ? true : false;

  return (
    <>
      <Modal
        size="lg"
        show={createModal}
        onHide={() => auditFunctions({ type: "createModal" })}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Audit Rulles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={Submit}>
            <Form.Row style={{ width: "50%" }}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Family</Form.Label>
                <FiveSDropdown
                  onChange={(e) => setRulles({ ...rulles, family: e.value })}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="issue">
                <Form.Label>Issue</Form.Label>
                <CustomInput
                  required={true}
                  value={rulles.issue}
                  type="text"
                  placeholder="Issue"
                  onChange={(e) => setRulles({ ...rulles, issue: e })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inspectable">
                <Form.Label>Inspectable</Form.Label>
                <CustomInput
                  required={true}
                  value={rulles.inspectable}
                  type="text"
                  placeholder="Inspectable"
                  onChange={(e) => setRulles({ ...rulles, inspectable: e })}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={2} as={Col} controlId="1points">
                <Form.Label>Points</Form.Label>
                <CustomInput
                  required={true}
                  type="number"
                  onChange={(e) => setRulles({ ...rulles, point1: e })}
                  value={rulles.point1}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="1rulles">
                <Form.Label>Rulles</Form.Label>
                <CustomInput
                  required={true}
                  type="text"
                  value={rulles.rulle1}
                  onChange={(e) => setRulles({ ...rulles, rulle1: e })}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={2} as={Col} controlId="2points">
                <Form.Label>Points</Form.Label>
                <CustomInput
                  required={true}
                  type="number"
                  value={rulles.point2}
                  onChange={(e) => setRulles({ ...rulles, point2: e })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="2rulles">
                <Form.Label>Rulles</Form.Label>
                <CustomInput
                  required={true}
                  type="text"
                  value={rulles.rulle2}
                  onChange={(e) => setRulles({ ...rulles, rulle2: e })}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={2} as={Col} controlId="3points">
                <Form.Label>Points</Form.Label>
                <CustomInput
                  required={true}
                  type="number"
                  value={rulles.point3}
                  onChange={(e) => setRulles({ ...rulles, point3: e })}
                />
              </Form.Group>
              <Form.Group controlId="3rulles" as={Col}>
                <Form.Label>Rulles</Form.Label>
                <CustomInput
                  required={true}
                  type="text"
                  value={rulles.rulle3}
                  onChange={(e) => setRulles({ ...rulles, rulle3: e })}
                />
              </Form.Group>
            </Form.Row>
            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={disabledSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateAuditRullesModal;
