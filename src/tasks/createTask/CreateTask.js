import React, { useContext, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import PriorityDropdown from "../../comonComponents/dropdowns/priorityDropdown";
import UserDropdown from "../../comonComponents/dropdowns/userDropdown";
import StatusDropdown from "../../comonComponents/dropdowns/statusDropdown";
import PlaceDropdown from "../../comonComponents/dropdowns/placeDropdown";
import { TaskContext } from "../taskContext";
import ObservationDropdown from "../../comonComponents/dropdowns/observationtypeDropdown";
import Custominput from "../../comonComponents/CustomInput";
import DatumsFilter from "../../comonComponents/DatePickerFilter";
import Datums from "../../comonComponents/CustomDatePicker";
import ReactDatePicker from "react-datepicker";

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
                  onChange={(e) => setNewTask({ ...newTask, placeId: e.value })}
                  clear={false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput3">
                <Form.Label>Responsible</Form.Label>
                <UserDropdown
                  onChange={(e) =>
                    setNewTask({ ...newTask, responsibleId: e.value })
                  }
                  clear={false}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput4">
                <Form.Label>Priority</Form.Label>
                <PriorityDropdown
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput5">
                <Form.Label>Status</Form.Label>
                <StatusDropdown
                  onChange={(e) => setNewTask({ ...newTask, status: e.value })}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="textinput7">
                <Form.Label>Observation</Form.Label>

                <ObservationDropdown
                  onChange={(e) =>
                    setNewTask({ ...newTask, observationId: e.value })
                  }
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
