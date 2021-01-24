import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Container, Modal, Row } from "react-bootstrap";
import BootstrapDropdown from "../../comonComponents/dropdowns/BootstarpDropdown";
import ResponsibleList from "./responsibleList";
import { UserContext } from "../userContext";
import { Post } from "../../helpers/axioPost";
import * as ApiPlaces from "../../apiLinks/httpPlaces";
const CreateUserModal = () => {
  const { modal, dispatch } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [placesWithoutMan, setPlacesWithoutMAn] = useState([]);

  const [user, setUser] = useState({
    isAdmin: false,
    manager: false,
    responsibleForPlace: [],
  });

  const create = async (e) => {
    e.preventDefault();
    await dispatch({ type: "createUser", payload: user });
    clearAll();
    getPlaceWitoutManager();
    console.log("call once");
  };

  useEffect(() => {
    getAllPlaces();
    getPlaceWitoutManager();
    console.log("now");
  }, []);

  const getAllPlaces = async () => {
    const res = await Post({ api: ApiPlaces.placesAllApi });
    setPlaces(res);
  };

  const getPlaceWitoutManager = async () => {
    const res = await Post({ api: ApiPlaces.placesWithoutMan });
    setPlacesWithoutMAn(res);
  };

  const clearAll = () => {
    setUser({
      isAdmin: false,
      manager: false,
      name: "",
      email: "",
      workPlace: "",
      responsibleForPlace: [],
    });
  };

  return (
    <div>
      <Modal
        show={modal.createModal}
        onHide={() => {
          dispatch({ type: "createUserModal" });
          clearAll();
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header
          closeButton={() => {
            dispatch({ type: "createUserModal" });
            clearAll();
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
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    value={user.email}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalName">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    placeholder="Name"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    value={user.name}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Working Place:</Form.Label>
                  {/* bts dropdown  */}
                  <BootstrapDropdown
                    value={places}
                    funk={(e) => setUser({ ...user, workPlace: e })}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    onChange={() =>
                      setUser({ ...user, isAdmin: !user.isAdmin })
                    }
                    checked={user.isAdmin}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom"
                    label="Manager"
                    onChange={() =>
                      setUser({ ...user, manager: !user.manager })
                    }
                    checked={user.manager}
                  />
                </Form.Group>

                {user.manager === true ? (
                  <div>
                    <ResponsibleList
                      placesWithoutMan={placesWithoutMan}
                      user={user}
                      setUser={setUser}
                    />
                  </div>
                ) : (
                  ""
                )}
                <Form.Group>
                  <Button
                    disabled={
                      user.name === "" ||
                      user.email === "" ||
                      user.workPlace === ""
                    }
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
