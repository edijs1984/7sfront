import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import BootstrapDropdown from "../../comonComponents/dropdowns/BootstarpDropdown";
import { UserContext } from "../userContext";
import { CompanyContext } from "../../company/companyContetx";

const EditUserModal = ({ selectedUser }) => {
  const { dispatch, modal } = useContext(UserContext);
  const { places, contextFunctions } = useContext(CompanyContext);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    workPlace: "",
    manager: null,
    isAdmin: null,
  });

  useEffect(() => {
    contextFunctions({ type: "getAllPlaces" });
  }, []);
  console.log(updatedUser);
  const update = () => {
    setUpdatedUser({
      ...updatedUser,
      manager: selectedUser.manager,
      isAdmin: selectedUser.isAdmin,
      workPlace: selectedUser.workPlace,
      name: selectedUser.name,
      email: selectedUser.email,
    });
  };
  const Submit = (e) => {
    e.preventDefault();
    dispatch({
      type: "editUser",
      payload: {
        name: updatedUser.name,
        email: updatedUser.email,
        workPlace: updatedUser.workPlace,
        manager: updatedUser.manager,
        isAdmin: updatedUser.isAdmin,
        id: selectedUser.id,
      },
    });
  };

  return selectedUser === null ? (
    ""
  ) : (
    <div>
      <Modal
        onShow={() => update()}
        show={modal.editModal}
        onHide={() => dispatch({ type: "editUserModal" })}
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

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }
                    value={updatedUser.email}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalName">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    placeholder="Name"
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, name: e.target.value })
                    }
                    value={updatedUser.name}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Working Place</Form.Label>
                  <BootstrapDropdown
                    value={places}
                    funk={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        workPlace: e,
                      })
                    }
                    cv={selectedUser.placeName}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    onChange={() =>
                      setUpdatedUser({
                        ...updatedUser,
                        isAdmin: !updatedUser.isAdmin,
                      })
                    }
                    checked={updatedUser.isAdmin}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom"
                    label="Manager"
                    onChange={() =>
                      setUpdatedUser({
                        ...updatedUser,
                        manager: !updatedUser.manager,
                      })
                    }
                    checked={updatedUser.manager}
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
