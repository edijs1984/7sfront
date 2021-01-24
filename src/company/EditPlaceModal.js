import React, { useContext, useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { CompanyContext } from "./companyContetx";
import UserDropdown from "./UserDropdown";

const EditPlaceModal = ({ selected }) => {
  const { modal, contextFunctions, allUsers } = useContext(CompanyContext);
  const [editedPlace, setEditedPlace] = useState({
    placeName: "",
    userId: "",
  });

  const Submit = (e) => {
    e.preventDefault();

    contextFunctions({
      type: "editPlace",
      payload: {
        placeName: editedPlace.placeName || selected.placeName,
        userId: editedPlace.userId || selected.userId,
        id: selected.id,
      },
    });
  };

  return (
    <>
      <Modal
        size="sm"
        show={modal}
        onHide={() => contextFunctions({ type: "setModal" })}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Place
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={Submit}>
            <Form.Group controlId="place">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter place name"
                value={editedPlace.placeName || selected.placeName}
                onChange={(e) =>
                  setEditedPlace({ ...editedPlace, placeName: e.target.value })
                }
                style={{ marginBottom: "2%" }}
              />

              <UserDropdown
                value={allUsers}
                tx={selected.userName}
                funk={(e) => setEditedPlace({ ...editedPlace, userId: e })}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditPlaceModal;
