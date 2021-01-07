import React, { useContext } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { Post } from "../../helpers/axioPost";
import BootstrapDropdown from "../../comonComponents/BootstarpDropdown";
import BootstrapDropdownMultipleEditUSer from "./BootstrapDropdownMutipleEditUser";
import { EditUserContext } from "../../context/editUserContext";

const EditUserModal = ({}) => {
  const {
    selectedUser,
    editUserModal,
    openCloseEditUserModal,
    allPlaces,
    placesWithoutManager,
    setResponsible,
    responsible,
    editResponsible,
  } = useContext(EditUserContext);

  console.log(responsible);

  return (
    <div>
      <Modal
        show={editUserModal}
        onHide={openCloseEditUserModal}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton={() => openCloseEditUserModal()}>
          <Modal.Title id="example-modal-sizes-title-sm">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div style={{ width: "70%", margin: "10%" }}>
              <Form onSubmit={""}>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    // onChange={(e) => setEmail(e.target.value)}
                    value={selectedUser.email}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalName">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    placeholder="Name"
                    // onChange={(e) => setName(e.target.value)}
                    value={selectedUser.name}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalEmail">
                  <Form.Label>Working Place</Form.Label>
                  <BootstrapDropdown
                    value={allPlaces}
                    // funk={(e) => setDepartment(e)}
                    currentValue={selectedUser.department}
                  />
                </Form.Group>

                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Administrator"
                    // onChange={() => setAdmin(!admin)}
                    checked={selectedUser.isAdmin}
                  />
                </Form.Group>
                <Form.Group controlId="formHorizontalCheck">
                  <Form.Check
                    type="switch"
                    id="custom"
                    label="Manager"
                    // onChange={() => setManager(!manager)}
                    checked={selectedUser.maneger}
                  />
                </Form.Group>

                {!selectedUser.maneger ? (
                  ""
                ) : (
                  <div>
                    <Form.Group controlId="formHorizontalEmail">
                      <Form.Label>Add Places responsible for: </Form.Label>
                      <BootstrapDropdown
                        funk={(e) => setResponsible([...responsible, e])}
                        value={placesWithoutManager || [""]}
                      />
                    </Form.Group>
                    <Form.Group controlId="formHorizontalEmail">
                      <Form.Label>Places responsible for:</Form.Label>

                      <BootstrapDropdownMultipleEditUSer
                        value={placesWithoutManager}
                        funk={(e) => console.log(e)}
                        currentValue={responsible}
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
                    // disabled={name === "" || email === "" || department === ""}
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
// const post = async (data) => {
//   await Post({
//     api: "/api/user/change",
//     data: {
//       id: selectedUser._id,
//       name: data.name,
//       email: data.email,
//       isAdmin: admin === "" ? selectedUser.isAdmin : admin,
//       manager: manager === "" ? selectedUser.manager : manager,
//       department: department === "" ? selectedUser.department : department,
//       responsible:
//         responsible === "" ? selectedUser.responsible : responsible,
//     },
//     message: "User Updated",
//   });
//   updateUser();
//   modalManage();
// };
