import React, { useContext, useState } from "react";
import { Modal, Row, Col, Form, Button, Table } from "react-bootstrap";
import CustomInput from "../../comonComponents/CustomInput";
import { CompanyContext } from "../companyContetx";
import funcTypes from "../funcTypes/obsFunc";
import DeleteBtn from "../../comonComponents/buttons/deleteButton";

const ObsTypeEdit = () => {
  const { obsFunctions, selectedObs, obsEditModal } = useContext(
    CompanyContext
  );

  const [newCategory, setNewCategory] = useState("");

  const editList = async (index) => {
    await selectedObs.observationCategory.splice(index, 1);

    obsFunctions({
      type: funcTypes.editObsSelected,
      payload: {
        ...selectedObs,
      },
    });
  };

  const update = () => {
    selectedObs.observationCategory.push(newCategory);

    setNewCategory("");
  };
  //
  return !selectedObs ? (
    ""
  ) : (
    <React.Fragment>
      <Modal
        size="lg"
        show={obsEditModal}
        onHide={() =>
          obsFunctions({ type: funcTypes.closeEditObservationTypeModal })
        }
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Observation type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs="5">
                <label>Observation type name</label>
                <CustomInput
                  onChange={(e) =>
                    obsFunctions({
                      type: funcTypes.editObsSelected,
                      payload: { ...selectedObs, observationName: e },
                    })
                  }
                  value={selectedObs.observationName}
                />
              </Col>
              <Col xs="5">
                <label>Observation Sub-Type</label>
                <CustomInput
                  onChange={(e) => setNewCategory(e)}
                  value={newCategory}
                />
              </Col>
              <Col>
                <label>Add</label>
                <Button
                  size="sm"
                  disabled={newCategory === ""}
                  onClick={update}
                >
                  Add subType
                </Button>
              </Col>
            </Row>
            {selectedObs.observationCategory ? (
              <Row style={{ marginTop: "2%" }}>
                <Table>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <td>Sub-Type</td>
                      <td>Remove</td>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {selectedObs.observationCategory.map((item, index) => {
                      return (
                        <tr>
                          <td>{item}</td>
                          <td>
                            <DeleteBtn onClick={() => editList(index)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            ) : (
              ""
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            onClick={() =>
              obsFunctions({ type: funcTypes.editObservationtype })
            }
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ObsTypeEdit;
