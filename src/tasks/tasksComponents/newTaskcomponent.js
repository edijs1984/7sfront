import React, { useState } from "react";
import { useForm } from "./../../comonComponents/useForm";
import PriorityDropdown from "./priorityDropdown";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomInput from "./../../comonComponents/customInput";
import AreaNameOnly from "./../../comonComponents/comonDropdowns/NameOnlydropdown/AreaNameOnly";
import WorkcenterNameOnly from "./../../comonComponents/comonDropdowns/NameOnlydropdown/WorkcenterNameOnly";
import Datums from "../../comonComponents/CustomDatePicker";
import SelectResponsible from "./../../comonComponents/comonDropdowns/SelectResponsible";

const NewTaskComponent = ({ createData }) => {
  let [values, handleChange] = useForm([]);
  const [area, setArea] = useState("");
  const [workcenter, setWorkcenter] = useState("");
  const [taskName, setInputName] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const createDisabled =
    taskName === "" ||
    area === "" ||
    !values.issue ||
    email === "" ||
    name === ""
      ? true
      : false;

  const textAreaStyle = {
    hight: "100%",
    width: "100%",
    border: "none",
    resize: "none",
    borderRadius: "1%",
    fontSize: "15px",
    fontFamily: "sans-serif"
  };
  return (
    <React.Fragment>
      <h1
        style={{
          color: "#ff6600",
          marginTop: "2%",
          marginLeft: "1%",
          fontWeight: "bold"
        }}
      >
        New Task
      </h1>
      <Container fluid style={{ marginTop: "2%" }}>
        <Row>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Task Name*</h2>
            <div style={{ width: "143%" }}>
              <CustomInput
                placholder="Task name"
                handl={val => setInputName(val)}
              />
            </div>
          </Col>
          <Col>
            <AreaNameOnly
              header={<h2 style={{ color: "#ff6600" }}>Area*</h2>}
              setName={res => setArea(res)}
            />
          </Col>
          <Col>
            <WorkcenterNameOnly
              header={<h2 style={{ color: "#ff6600" }}>WorkCenter</h2>}
              setName={res => setWorkcenter(res)}
            />
          </Col>
          <Col>
            <SelectResponsible
              header={<h2 style={{ color: "#ff6600" }}>Responsible*</h2>}
              mail={res => setEmail(res)}
              name={res => setName(res)}
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Priority</h2>
            <PriorityDropdown prio={res => setPriority(res)} />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Deadline</h2>
            <Datums setDate={res => setDeadline(res)} />
          </Col>
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Issue*</h2>
            <textarea
              style={textAreaStyle}
              type="text"
              name={"issue"}
              value={values.issue || ""}
              onChange={handleChange}
              rows="5"
              required
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Task</h2>
            <textarea
              style={textAreaStyle}
              type="text"
              name={"task"}
              value={values.task || ""}
              onChange={handleChange}
              rows="5"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Cause</h2>
            <textarea
              style={textAreaStyle}
              type="text"
              name={"cause"}
              value={values.cause || ""}
              onChange={handleChange}
              rows="5"
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Comments</h2>
            <textarea
              style={textAreaStyle}
              type="text"
              name={"comments"}
              value={values.comments || ""}
              onChange={handleChange}
              rows="5"
            />
            <Col
              style={{
                float: "right",
                width: "30%",
                marginLeft: "10%",
                marginTop: "2%"
              }}
            >
              <Button
                hidden={createDisabled}
                style={{ marginRight: "2%" }}
                size="lg"
                variant="success"
                onClick={() => {
                  createData({
                    values,
                    workcenter,
                    deadline,
                    area,
                    email,
                    name,
                    taskName,
                    priority
                  });
                }}
                as={Link}
                to="/tasks"
              >
                Create
              </Button>

              <Button size="lg" variant="danger" as={Link} to="/tasks">
                Cancel
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default NewTaskComponent;
