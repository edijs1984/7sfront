import React, { useContext } from "react";
import { AuditContext } from "../auditContext";
import { Modal, Form, Col, Button } from "react-bootstrap";
import FiveSDropdown from "./fiveSDropdown";
import CustomInput from "../../comonComponents/CustomInput";

const EditAuditRullesModal = () => {
  const { auditFunctions, editRullesModal, selectedRulle } = useContext(
    AuditContext
  );

  const submit = (e) => {
    e.preventDefault();
    auditFunctions({ type: "editRulle" });
  };

  return !selectedRulle ? (
    ""
  ) : (
    <>
      <Modal
        size="lg"
        show={editRullesModal}
        onHide={() => auditFunctions({ type: "closeEditModal" })}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Rulle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            <Form.Row style={{ width: "50%" }}>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Family</Form.Label>
                <FiveSDropdown
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, sofs: e.value },
                    })
                  }
                  valueSelected={{
                    value: selectedRulle.sofs,
                    label: selectedRulle.sofs,
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="issue">
                <Form.Label>Issue</Form.Label>
                <CustomInput
                  required={true}
                  value={selectedRulle.issue}
                  type="text"
                  placeholder="Issue"
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, issue: e },
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="inspectable">
                <Form.Label>Inspectable</Form.Label>
                <CustomInput
                  required={true}
                  value={selectedRulle.inspectable}
                  type="text"
                  placeholder="Inspectable"
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, inspectable: e },
                    })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={2} as={Col} controlId="1points">
                <Form.Label>Points</Form.Label>
                <CustomInput
                  required={true}
                  type="number"
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, point1: e },
                    })
                  }
                  value={selectedRulle.point1}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="1rulles">
                <Form.Label>Rulles</Form.Label>
                <CustomInput
                  required={true}
                  type="text"
                  value={selectedRulle.rulle1}
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, rulle1: e },
                    })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={2} as={Col} controlId="2points">
                <Form.Label>Points</Form.Label>
                <CustomInput
                  required={true}
                  type="number"
                  value={selectedRulle.point2}
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, point2: e },
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="2rulles">
                <Form.Label>Rulles</Form.Label>
                <CustomInput
                  required={true}
                  type="text"
                  value={selectedRulle.rulle2}
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, rulle2: e },
                    })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group xs={2} as={Col} controlId="3points">
                <Form.Label>Points</Form.Label>
                <CustomInput
                  required={true}
                  type="number"
                  value={selectedRulle.point3}
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, point3: e },
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="3rulles" as={Col}>
                <Form.Label>Rulles</Form.Label>
                <CustomInput
                  required={true}
                  type="text"
                  value={selectedRulle.rulle3}
                  onChange={(e) =>
                    auditFunctions({
                      type: "editSelectedRulle",
                      payload: { ...selectedRulle, rulle3: e },
                    })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditAuditRullesModal;
