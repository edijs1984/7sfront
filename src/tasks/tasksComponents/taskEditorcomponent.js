import React, { useContext, useState } from "react";
import PriorityDropdown from "./priorityDropdown";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomInput from "./../../comonComponents/customInput";
import { EditTaskContext } from "./../../context/editTaskContext";
import AreaNameOnly from "./../../comonComponents/comonDropdowns/NameOnlydropdown/AreaNameOnly";
import WorkcenterNameOnly from "./../../comonComponents/comonDropdowns/NameOnlydropdown/WorkcenterNameOnly";
import CustomStatus from "./../../comonComponents/CustomStatus";
import Datums from "../../comonComponents/CustomDatePicker";
import { UserName } from "../../comonComponents/axiosFunctions";
import SelectResponsible from "./../../comonComponents/comonDropdowns/SelectResponsible";
const TaskeditorComponent = ({ editData }) => {
  const [editTaskData, setEditTaskData] = useContext(EditTaskContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const textAreaStyle = {
    hight: "100%",
    width: "100%",
    border: "none",
    resize: "none",
    borderRadius: "1%",
    fontSize: "15px",
    fontFamily: "sans-serif"
  };

  const available =
    editTaskData.responsible === UserName || editTaskData.creator === UserName
      ? false
      : true;

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
        Edit Task
      </h1>
      <Container fluid style={{ marginTop: "2%" }}>
        <Row>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Task Name</h2>
            <div style={{ width: "143%" }}>
              <CustomInput
                placholder="Task name"
                handl={res => setEditTaskData({ ...editTaskData, name: res })}
                currentValue={editTaskData.name}
                available={available}
              />
            </div>
          </Col>
          <Col>
            <AreaNameOnly
              header={<h2 style={{ color: "#ff6600" }}>Area</h2>}
              setName={res => setEditTaskData({ ...editTaskData, area: res })}
              defaultValue={editTaskData.area}
              available={available}
            />
          </Col>
          <Col>
            <WorkcenterNameOnly
              header={<h2 style={{ color: "#ff6600" }}>WorkCenter</h2>}
              setName={res =>
                setEditTaskData({ ...editTaskData, subarea: res })
              }
              defaultValue={editTaskData.subarea}
              available={available}
            />
          </Col>
          <Col>
            <SelectResponsible
              header={<h2 style={{ color: "#ff6600" }}>Responsible</h2>}
              name={res => setName(res)}
              mail={res => setEmail(res)}
              defaultValue={editTaskData.email}
              available={available}
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Priority</h2>
            <PriorityDropdown
              prio={res =>
                setEditTaskData({ ...editTaskData, priority: res.selected })
              }
              defaultValue={editTaskData.priority}
              available={available}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row style={{ marginTop: "1%", marginBottom: "1%" }}>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Planned Hours</h2>
            <CustomInput
              width={"80%"}
              type={"number"}
              currentValue={editTaskData.estimatedTime}
              handl={res =>
                setEditTaskData({ ...editTaskData, estimatedTime: res })
              }
              available={available}
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Hours used</h2>
            <CustomInput
              width={"80%"}
              type={"number"}
              currentValue={editTaskData.completedHours}
              handl={res =>
                setEditTaskData({ ...editTaskData, completedHours: res })
              }
              available={available}
            />
          </Col>

          <Col>
            <h2 style={{ color: "#ff6600" }}>Status</h2>
            <CustomStatus
              defaultValue={editTaskData.status}
              prio={res =>
                setEditTaskData({ ...editTaskData, status: res.selected })
              }
              available={available}
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600", marginTop: "1%" }}>Deadline</h2>
            <div style={{ width: "47%" }}>
              <CustomInput
                width={"100%"}
                available={true}
                currentValue={new Date(
                  editTaskData.deadline
                ).toLocaleDateString("fr-CA")}
              />
            </div>
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600", marginTop: "1%" }}>Rescheduled</h2>
            <CustomInput
              available={true}
              currentValue={
                editTaskData.newdeadline
                  ? new Date(editTaskData.newdeadline).toLocaleDateString(
                      "fr-CA"
                    )
                  : "Not rescheduled"
              }
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600", marginTop: "2%" }}>Reschedule</h2>
            <Datums
              setDate={res =>
                setEditTaskData({ ...editTaskData, rescheduled: res })
              }
              available={available}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Issue</h2>
            <textarea
              style={textAreaStyle}
              disabled={available}
              type="text"
              name={"issue"}
              value={editTaskData.issue || ""}
              onChange={e =>
                setEditTaskData({
                  ...editTaskData,
                  issue: e.target.value
                })
              }
              rows="5"
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Task</h2>
            <textarea
              disabled={available}
              style={textAreaStyle}
              type="text"
              name={"task"}
              value={editTaskData.task || ""}
              onChange={e =>
                setEditTaskData({
                  ...editTaskData,
                  task: e.target.value
                })
              }
              rows="5"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Cause</h2>
            <textarea
              disabled={available}
              style={textAreaStyle}
              type="text"
              name={"cause"}
              value={editTaskData.cause || ""}
              onChange={e =>
                setEditTaskData({
                  ...editTaskData,
                  cause: e.target.value
                })
              }
              rows="5"
            />
          </Col>
          <Col>
            <h2 style={{ color: "#ff6600" }}>Comments</h2>
            <textarea
              style={textAreaStyle}
              type="text"
              name={"comment"}
              value={editTaskData.comment || ""}
              onChange={e =>
                setEditTaskData({
                  ...editTaskData,
                  comment: e.target.value
                })
              }
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
                style={{ marginRight: "2%" }}
                size="lg"
                variant="success"
                onClick={() => editData({ editTaskData, email, name })}
                as={Link}
                to="/tasks"
              >
                Update
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
export default TaskeditorComponent;
