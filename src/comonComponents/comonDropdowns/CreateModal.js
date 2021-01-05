import React from "react";
import { Modal } from "react-bootstrap";

const CreateModal = ({
  header,
  body,
  submitButton,
  modalStatus,
  exitButton
}) => {
  return (
    <Modal show={modalStatus}>
      <Modal.Header>
        <h3 style={{ fontWeight: "bold", color: "#ff6600" }}>{header}</h3>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {exitButton}
        {submitButton}
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
