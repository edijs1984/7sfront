import React, { useContext, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import PriorityDropdown from "../../comonComponents/dropdowns/priorityDropdown";
import UserDropdown from "../../comonComponents/dropdowns/userDropdown";
import StatusDropdown from "../../comonComponents/dropdowns/statusDropdown";
import PlaceDropdown from "../../comonComponents/dropdowns/placeDropdown";
import { TaskContext } from "../taskContext";
import Datums from "../../comonComponents/CustomDatePicker";
import ObservationDropdown from "../../comonComponents/dropdowns/observationtypeDropdown";

const CreateTask = () => {
  const { taskFunctions, createModal } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    issue: "",
    placeId: "",
    creatorId: "",
    responsibleId: "",
    observationId: "",
    status: "",
    comment: "",
    priority: "",
    deadline: "",
    status: "",
  });

  const submitResult = () => {
    taskFunctions({ type: "createTask", payload: newTask });
  };

  return (
    <React.Fragment>
      <Modal
        animation
        centered
        size="xl"
        show={createModal}
        onHide={() => taskFunctions({ type: "createModal" })}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#163a5f", color: "white" }}
        >
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="textinput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) =>
                    setNewTask({ ...newTask, issue: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput2">
                <Form.Label>Action</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) =>
                    setNewTask({ ...newTask, comment: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="textinput3">
                <Form.Label>Place</Form.Label>
                <PlaceDropdown
                  funk={(e) => setNewTask({ ...newTask, placeId: e })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput3">
                <Form.Label>Responsible</Form.Label>
                <UserDropdown
                  funk={(e) => setNewTask({ ...newTask, responsibleId: e })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput4">
                <Form.Label>Priority</Form.Label>
                <PriorityDropdown
                  funk={(e) => setNewTask({ ...newTask, priority: e })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput5">
                <Form.Label>Status</Form.Label>
                <StatusDropdown
                  funk={(e) => setNewTask({ ...newTask, status: e })}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="textinput7">
                <Form.Label>Observation</Form.Label>

                <ObservationDropdown
                  funk={(e) => setNewTask({ ...newTask, observationId: e })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="textinput6">
                <Row style={{ marginLeft: "0%" }}>
                  <Form.Label>Deadlien</Form.Label>
                </Row>
                <Datums
                  setDate={(e) => setNewTask({ ...newTask, deadline: e })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.File id="formcheck-api-regular">
                <Form.File.Label>Select Image</Form.File.Label>
                <Form.File.Input />
              </Form.File>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" onClick={submitResult}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default CreateTask;
