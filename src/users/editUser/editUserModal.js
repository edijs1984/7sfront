import React, { useContext } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { UserContext } from "../userContext";
import CustomInput from "../../comonComponents/CustomInput";
import PlaceDropdown from "../../comonComponents/dropdowns/placeDropdown";

const EditUserModal = () => {
  const { userFunctions, editModal, selected } = useContext(UserContext);

  const Submit = (e) => {
    e.preventDefault();
    userFunctions({
      type: "editUser",
    });
  };
  return selected === null ? (
    ""
  ) : (
    <div>
      <Modal
        show={editModal}
        onHide={() => userFunctions({ type: "closeEditModal" })}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div style={{ width: "70%", margin: "10%" }}>
              <Form onSubmit={Submit}>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Email</Form.Label>
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      userFunctions({
                        type: "editSelected",
                        payload: { ...selected, email: e },
                      })
                    }
                    value={selected.email}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalName">
                  <Form.Label>Name</Form.Label>
                  <CustomInput
                    placeholder="Name"
                    onChange={(e) =>
                      userFunctions({
                        type: "editSelected",
                        payload: { ...selected, name: e },
                      })
                    }
                    value={selected.name}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Working Place</Form.Label>
                  <PlaceDropdown
                    valueSelected={selected.place}
                    onChange={(e) =>
                      userFunctions({
                        type: "editSelected",
                        payload: { ...selected, place: e },
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    onChange={() =>
                      userFunctions({
                        type: "editSelected",
                        payload: { ...selected, isAdmin: !selected.isAdmin },
                      })
                    }
                    checked={selected.isAdmin}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom"
                    label="Manager"
                    onChange={() =>
                      userFunctions({
                        type: "editSelected",
                        payload: { ...selected, manager: !selected.manager },
                      })
                    }
                    checked={selected.manager}
                  />
                </Form.Group>

                <Form.Group>
                  <Button type="submit">Update</Button>
                </Form.Group>
              </Form>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditUserModal;
