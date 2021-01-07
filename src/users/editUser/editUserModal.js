import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { Post } from "../../helpers/axioPost";
import BootstrapDropdown from "../../comonComponents/BootstarpDropdown";
import BootstrapDropdownMultipleEditUSer from "./BootstrapDropdownMutipleEditUser";
const EditUserModal = ({ openModal, modalManage, selected, updateUser }) => {
  const [admin, setAdmin] = useState(false);
  const [manager, setManager] = useState(false);
  const [department, setDepartment] = useState("");
  const [responsible, setResponsible] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [places, setPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);

  const res = async () => {
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
    setAdmin(selected.isAdmin === true ? true : false);
    setManager(selected.maneger === true ? true : false);
    res();
  }, []);

  const post = async (data) => {
    await Post({
      api: "/api/user/change",
      data: {
        id: selected._id,
        name: data.name,
        email: data.email,
        isAdmin: admin === "" ? selected.isAdmin : admin,
        manager: manager === "" ? selected.manager : manager,
        department: department === "" ? selected.department : department,
        responsible: responsible === "" ? selected.responsible : responsible,
      },
      message: "User Updated",
    });
    updateUser();
    modalManage();
  };

  useEffect(() => {
    setAdmin(selected.isAdmin);
    setManager(selected.manager);
  }, []);

  const set = ["a", "b", "c"];
  const EditResponsible = async (value) => {
    setResponsible(responsible.filter((resp) => resp !== value));
  };
  return (
    <div>
      <Modal
        show={openModal}
        onHide={modalManage}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton={() => modalManage()}>
          <Modal.Title id="example-modal-sizes-title-sm">Edit User</Modal.Title>
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
                    value={selected.email}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalName">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={selected.name}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Working Place</Form.Label>
                  <BootstrapDropdown
                    value={allPlaces}
                    funk={(e) => setDepartment(e)}
                    currentValue={selected.department}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    onChange={() => setAdmin(!admin)}
                    checked={selected.isAdmin}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom"
                    label="Manager"
                    onChange={() => setManager(!manager)}
                    checked={selected.maneger}
                  />
                </Form.Group>

                {!selected.maneger ? (
                  ""
                ) : (
                  <div>
                    <Form.Group controlId="formHorizontalEmail">
                      <Form.Label>Add Places responsible for: </Form.Label>
                      <BootstrapDropdown
                        funk={(e) => setResponsible([...responsible, e])}
                        value={
                          places.length > 0
                            ? places
                            : ["All places have managers"]
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formHorizontalEmail">
                      <Form.Label>Places responsible for:</Form.Label>

                      <BootstrapDropdownMultipleEditUSer
                        value={places}
                        funk={(e) => EditResponsible(e)}
                        currentValue={selected.responsible}
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

export default EditUserModal;
