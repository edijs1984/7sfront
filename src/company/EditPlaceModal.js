import React, { useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { CompanyContext } from "./companyContetx";
import CustomInput from "../comonComponents/CustomInput";
import UserDropdown from "../comonComponents/dropdowns/userDropdown";

const EditPlaceModal = () => {
  const { modal, placeFunctions, selected } = useContext(CompanyContext);

  const Submit = (e) => {
    e.preventDefault();
    placeFunctions({
      type: "editPlace",
    });
  };
  return (
    <>
      <Modal
        size="sm"
        show={modal}
        onHide={() => placeFunctions({ type: "closeEditModal" })}
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
              <CustomInput
                value={selected.placeName}
                onChange={(e) =>
                  placeFunctions({
                    type: "editSelected",
                    payload: { ...selected, placeName: e },
                  })
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Responsible</Form.Label>
              <UserDropdown
                onChange={(e) =>
                  placeFunctions({
                    type: "editSelected",
                    payload: { ...selected, user: e },
                  })
                }
                valueSelected={selected.user}
              />
            </Form.Group>
            <Button disabled={!selected.user} type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditPlaceModal;
