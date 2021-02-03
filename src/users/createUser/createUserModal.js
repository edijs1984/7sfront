import React, { useContext, useState } from "react";
import { Form, Button, Container, Modal, Row } from "react-bootstrap";
import CustomInput from "../../comonComponents/CustomInput";
import { UserContext } from "../userContext";
import PlaceDropdown from "../../comonComponents/dropdowns/placeDropdown";
import PlaceMultipleDropdown from "../../comonComponents/dropdowns/PlaceMultipleDropdown";

const CreateUserModal = () => {
  const { createModal, userFunctions } = useContext(UserContext);

  const [responsible, setResponsible] = useState([]);
  const [place, setPlace] = useState("");
  const [user, setUser] = useState({
    isAdmin: false,
    manager: false,
    responsibleForPlace: [],
  });

  const create = async (e) => {
    e.preventDefault();
    responsible.forEach((i) => user.responsibleForPlace.push(i.value));
    await userFunctions({
      type: "createUser",
      payload: { ...user, workPlace: place.value },
    });
    setUser({ isAdmin: false, manager: false, responsibleForPlace: [] });
    setPlace("");
  };

  return (
    <div>
      <Modal
        show={createModal}
        onHide={() => {
          userFunctions({ type: "createUserModal" });
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header
          closeButton={() => {
            userFunctions({ type: "createUserModal" });
          }}
        >
          <Modal.Title id="example-modal-sizes-title-sm">
            Create User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div style={{ width: "90%", margin: "2%" }}>
              <Form onSubmit={create}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <CustomInput
                    required={true}
                    type="email"
                    placeholder={"Email"}
                    onChange={(e) => setUser({ ...user, email: e })}
                    value={user.email || ""}
                  />
                </Form.Group>
                {/* // */}
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <CustomInput
                    required={true}
                    placeholder={"Name"}
                    onChange={(e) => setUser({ ...user, name: e })}
                    value={user.name || ""}
                  />
                </Form.Group>
                {/* // */}
                <Form.Group>
                  <Form.Label>Working Place:</Form.Label>
                  <PlaceDropdown
                    placeholder={"Select work place"}
                    valueSelected={place}
                    onChange={(e) => {
                      setPlace(e);
                    }}
                  />
                </Form.Group>
                {/* // */}
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    defaultValue={false}
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    onChange={() =>
                      setUser({ ...user, isAdmin: !user.isAdmin })
                    }
                    checked={user.isAdmin}
                  />
                </Form.Group>
                {/* // */}
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    defaultValue={false}
                    type="switch"
                    id="custom"
                    label="Manager"
                    onChange={() =>
                      setUser({ ...user, manager: !user.manager })
                    }
                    checked={user.manager}
                  />
                </Form.Group>
                {/* // */}
                {user.manager === true ? (
                  <div style={{ marginBottom: "20%" }}>
                    <PlaceMultipleDropdown
                      onChange={(e) => setResponsible(e)}
                      valueSelected={responsible}
                    />
                  </div>
                ) : (
                  ""
                )}
                <Form.Group>
                  <Button disabled={!place} type="submit">
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
