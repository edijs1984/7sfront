import React, { useState, useContext } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import BootstrapDropdown from "../../comonComponents/BootstarpDropdown";
import BootstrapDropdownMultiple from "../../comonComponents/BootstarpDropdownMultiple";
import { Post, Company } from "../../helpers/axioPost";
import { EditUserContext } from "../../context/editUserContext";

const CreateUserModal = () => {
  const {
    allPlaces,
    placesWithoutManager,
    createUserModal,
    openCloseCreateUserModal,
    getAllUsers,
    getAllPlaces,
  } = useContext(EditUserContext);
  const [manager, setManager] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responsible, setResponsible] = useState([]);

  const post = async (e) => {
    e.preventDefault();
    const res = await Post({
      api: "/api/user/create",
      data: {
        name: name,
        email: email,
        isAdmin: admin,
        department: department,
        maneger: manager,
        responsible: responsible,
        company: Company,
      },
      notifytrue: true,
      message: "User created",
    });
    clearAll();
    getAllUsers();
    getAllPlaces();
  };

  const clearAll = () => {
    setManager(false);
    setAdmin(false);
    setName("");
    setEmail("");
    setResponsible("");
    setDepartment("");
  };

  const EditResponsible = async (value) => {
    setResponsible(responsible.filter((resp) => resp !== value));
  };
  return (
    <div>
      <Modal
        show={createUserModal}
        onHide={() => openCloseCreateUserModal()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton={() => openCloseCreateUserModal()}>
          <Modal.Title id="example-modal-sizes-title-sm">
            Create User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div style={{ width: "70%", margin: "10%" }}>
              <Form onSubmit={post}>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalName">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Working Place:</Form.Label>

                  <BootstrapDropdown
                    value={allPlaces}
                    funk={(e) => setDepartment(e)}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    onChange={() => setAdmin(!admin)}
                    checked={admin}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom"
                    label="Manager"
                    onChange={() => setManager(!manager)}
                    checked={manager}
                  />
                </Form.Group>

                {!manager ? (
                  ""
                ) : (
                  <div>
                    <Form.Group controlId="formHorizontalEmail">
                      <Form.Label>Add Places </Form.Label>

                      <BootstrapDropdown
                        funk={(e) => setResponsible([...responsible, e])}
                        value={placesWithoutManager}
                      />
                    </Form.Group>
                    <Form.Group controlId="formHorizontalEmail">
                      <Form.Label>Places responsible for:</Form.Label>

                      <BootstrapDropdownMultiple
                        value={responsible}
                        funk={(e) => EditResponsible(e)}
                      />
                      <Form.Label>
                        <h6 style={{ color: "blue" }}>
                          Click on place to remove
                        </h6>
                      </Form.Label>
                    </Form.Group>
                  </div>
                )}
                <Form.Group>
                  <Button
                    disabled={name === "" || email === "" || department === ""}
                    type="submit"
                  >
                    Create
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
