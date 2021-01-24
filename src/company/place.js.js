import React, { useState, useContext } from "react";
import { Table, Button, Form, Container, Row } from "react-bootstrap";
import UserDropdown from "./UserDropdown";
import SettingsMenuBar from "../comonComponents/settingMenuBar";
import { CompanyContext } from "./companyContetx";
import EditPlaceModal from "./EditPlaceModal";
import EditBtn from "../comonComponents/buttons/editButton";
import DeleteBtn from "../comonComponents/buttons/deleteButton";
const Place = () => {
  const { contextFunctions, allUsers, places } = useContext(CompanyContext);
  const [newPlace, setNewPlace] = useState({ placeName: "", userId: "" });
  const [selected, setSelected] = useState({});

  const submit = (e) => {
    e.preventDefault();
    contextFunctions({ type: "createPlace", payload: newPlace });
  };

  return (
    <React.Fragment>
      <SettingsMenuBar />
      <Container fluid="sm">
        <Row className="justify-content-md-center">
          <div style={{ width: "70%" }}>
            <h1
              style={{
                color: "#2f3c48",
                marginTop: "2%",
                fontWeight: "bold",
                marginBottom: "2%",
              }}
            >
              Places
            </h1>
            <div style={{ width: "20%" }}>
              <Form onSubmit={submit}>
                <Form.Group controlId="place">
                  <Form.Label>Place</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter place name"
                    value={newPlace.placeName}
                    onChange={(e) =>
                      setNewPlace({ ...newPlace, placeName: e.target.value })
                    }
                    style={{ marginBottom: "2%" }}
                  />

                  <UserDropdown
                    value={allUsers}
                    funk={(e) => setNewPlace({ ...newPlace, userId: e })}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Button type="submit">Create Place</Button>
              </Form>
            </div>
            <div style={{ margin: "2%" }} />
            {places.length < 1 ? (
              ""
            ) : (
              <React.Fragment>
                <Table striped bordered hover size="sm">
                  <thead
                    style={{
                      backgroundColor: "#2f3c48",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <tr>
                      <td>Place Name</td>
                      <td>Users assigned</td>
                      <td>Responsible</td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                  </thead>
                  <tbody>
                    {places.map((pla) => {
                      return (
                        <tr key={pla._id} style={{ textAlign: "center" }}>
                          <td>{pla.placeName}</td>
                          <td></td>
                          <td>
                            {pla.responsible !== null ? (
                              pla.responsible.name
                            ) : (
                              <h5 style={{ color: "red" }}>No responsible</h5>
                            )}
                          </td>
                          <td>
                            <EditBtn
                              onClick={() => {
                                contextFunctions({ type: "setModal" });
                                setSelected({
                                  id: pla._id,
                                  placeName: pla.placeName,
                                  userId:
                                    pla.responsible === null
                                      ? ""
                                      : pla.responsible._id,
                                  userName:
                                    pla.responsible === null
                                      ? ""
                                      : pla.responsible.name,
                                });
                              }}
                            />
                          </td>
                          <td>
                            <DeleteBtn
                              onClick={() =>
                                contextFunctions({
                                  type: "deletePlace",
                                  payload: {
                                    id: pla._id,
                                    userId:
                                      pla.responsible === null
                                        ? ""
                                        : pla.responsible._id,
                                  },
                                })
                              }
                              style={{ marginLeft: "1%" }}
                            >
                              Delete
                            </DeleteBtn>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </React.Fragment>
            )}
          </div>
        </Row>
        <EditPlaceModal selected={selected} />
      </Container>
    </React.Fragment>
  );
};
export default Place;
