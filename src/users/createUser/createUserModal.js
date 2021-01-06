import React, { useState, useEffect } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import BootstrapDropdown from "../../comonComponents/BootstarpDropdown";
import BootstrapDropdownMultiple from "../../comonComponents/BootstarpDropdownMultiple";
import { Post, Company } from "../../helpers/axioPost";

const CreateUserModal = ({ shoWmodal, closeModal }) => {
  const [manager, setManager] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responsible, setResponsible] = useState([]);
  const [places, setPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [count, setCount] = useState(0);

  const ress = async () => {
    const res = await Post({
      api: "/api/plant/all/department",
      notifytrue: false,
    });
    const value = res.filter(
      (value) => !value.responsible || value.responsible === ""
    );
    setAllPlaces(res);
    setPlaces(value);
  };

  useEffect(() => {
    ress();
  }, [count]);

  function clearAll() {
    setManager(false);
    setAdmin(false);
    setDepartment("");
    setName("");
    setEmail("");
    setResponsible([""]);
    setPlaces([]);
    setCount(count + 1);
  }

  const post = async (e) => {
    e.preventDefault();
    clearAll();
    Post({
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
  };

  const EditResponsible = async (value) => {
    setResponsible(responsible.filter((resp) => resp !== value));
  };
  return (
    <div>
      <Modal
        show={shoWmodal}
        onHide={closeModal}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton={() => closeModal()}>
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
                  <Form.Label>Place</Form.Label>

                  <BootstrapDropdown
                    value={places}
                    shit={department}
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
                        value={places}
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
