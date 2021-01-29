import React, { useContext } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import PriorityDropdown from "../../comonComponents/dropdowns/priorityDropdown";
import UserDropdown from "../../comonComponents/dropdowns/userDropdown";
import StatusDropdown from "../../comonComponents/dropdowns/statusDropdown";
import PlaceDropdown from "../../comonComponents/dropdowns/placeDropdown";
import { TaskContext } from "../taskContext";
import ObservationDropdown from "../../comonComponents/dropdowns/observationtypeDropdown";
import Datums from "../../comonComponents/CustomDatePicker";

const EditTask = () => {
  const { taskFunctions, editTaskModal, selectedTask } = useContext(
    TaskContext
  );
  const submitResult = (e) => {
    e.preventDefault();
    taskFunctions({ type: "editTask" });
  };
  return (
    <React.Fragment>
      <Modal
        animation
        centered
        size="xl"
        show={editTaskModal}
        onHide={() => taskFunctions({ type: "closeEditTaskModal" })}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2f3c48", color: "white" }}
        >
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Observation
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
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, issue: e.target.value },
                    })
                  }
                  value={selectedTask.issue}
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
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, comment: e.target.value },
                    })
                  }
                  value={selectedTask.comment}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="textinput3">
                <Form.Label>Place</Form.Label>
                <PlaceDropdown
                  onChange={(e) =>
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, place: e },
                    })
                  }
                  valueSelected={selectedTask.place}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput3">
                <Form.Label>Responsible</Form.Label>
                <UserDropdown
                  onChange={(e) =>
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, responsible: e },
                    })
                  }
                  valueSelected={selectedTask.responsible}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput4">
                <Form.Label>Priority</Form.Label>
                <PriorityDropdown
                  onChange={(e) =>
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, priority: e },
                    })
                  }
                  valueSelected={selectedTask.priority}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="textinput5">
                <Form.Label>Status</Form.Label>
                <StatusDropdown
                  onChange={(e) =>
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, status: e },
                    })
                  }
                  valueSelected={selectedTask.status}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="textinput7">
                <Form.Label>Observation</Form.Label>

                <ObservationDropdown
                  onChange={(e) =>
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, observationtype: e },
                    })
                  }
                  valueSelected={selectedTask.observationtype}
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
                  selectedDate={selectedTask.deadline}
                  setDate={(e) =>
                    taskFunctions({
                      type: "editSelectedTask",
                      payload: { ...selectedTask, deadline: e },
                    })
                  }
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

export default EditTask;
