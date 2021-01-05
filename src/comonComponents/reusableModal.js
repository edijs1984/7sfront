import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { ModalContext } from "./../context/modalContext";
const ReusableModal = ({
  header,
  body,
  submitButton,
  size,
  buttonName,
  buttonSize,
}) => {
  const [modalStatus, setModalStatus] = useContext(ModalContext);

  return (
    <Modal show={modalStatus} size={size}>
      <Modal.Header>
        <h3 style={{ fontWeight: "bold", color: "#ff6600" }}>{header}</h3>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => setModalStatus(!modalStatus)}
          size={buttonSize || "sm"}
          floated="left"
          variant="danger"
        >
          {buttonName || "Exit"}
        </Button>
        {submitButton}
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModal;
