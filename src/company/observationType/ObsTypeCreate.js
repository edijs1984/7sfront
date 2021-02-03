import React, { useContext, useState } from "react";
import { Modal, Row, Col, Form, Button, Table } from "react-bootstrap";
import CustomInput from "../../comonComponents/CustomInput";
import { CompanyContext } from "../companyContetx";
import funcTypes from "../funcTypes/obsFunc";
import DeleteBtn from "../../comonComponents/buttons/deleteButton";

const ObsTypeCreate = () => {
  const { obsFunctions, obsCreateModal } = useContext(CompanyContext);
  const [category, setCategory] = useState("");
  const [observationName, setObservationName] = useState("");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  const create = () => {
    obsFunctions({
      type: funcTypes.createObservationType,
      payload: {
        observationName: observationName,
        observationCategory: list,
      },
    });
    setList([]);
    setObservationName("");
  };

  const updateList = () => {
    list.push(category);
    setCategory("");
  };
  const editList = (value) => {
    list.splice(value, 1);
    setCount(count + 1);
  };
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={obsCreateModal}
        onHide={() => obsFunctions({ type: funcTypes.obsCreateModal })}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Observation type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs="5">
                <label>Observation type name</label>
                <CustomInput
                  onChange={(e) => setObservationName(e)}
                  value={observationName}
                />
              </Col>
              <Col xs="5">
                <label>Observation Sub-Type</label>
                <CustomInput
                  onChange={(e) => setCategory(e)}
                  value={category}
                />
              </Col>
              <Col>
                <label>Add</label>
                <Button
                  size="sm"
                  disabled={category === ""}
                  onClick={() => updateList()}
                >
                  Add subType
                </Button>
              </Col>
            </Row>
            {list.length > 0 ? (
              <Row style={{ marginTop: "2%" }}>
                <Table>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <td>Sub-Type</td>
                      <td>Remove</td>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {list.map((item, index) => {
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
          <Button size="sm" onClick={create}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default ObsTypeCreate;
