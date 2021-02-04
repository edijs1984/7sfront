import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, Modal, ProgressBar } from "react-bootstrap";
import { User } from "../../comonComponents/axiosFunctions";
import Datums from "../../comonComponents/CustomDatePicker";
import CustomDropdown from "../../comonComponents/customDropdown";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import { toast } from "react-toastify";
import ObservationTypeDropdown from "../../comonComponents/observationTypeDropdown";
import PriorityDropdown from "../tasksComponents/priorityDropdown";

const QuickTaskCreateModal = ({ updatePage, crModalStatus, createModal }) => {
  const [issue, setIsue] = useState("");
  const [responsible, setResponsible] = useState("");
  const [coments, setComent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [ob, setObservation] = useState("");
  const [priority, setPriority] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState();
  const [uploadProcentage, setUploadProcentage] = useState(0);
  const [safetyCategory, setSafetyCategory] = useState("");

  const token = localStorage.getItem("JwtToken");
  useEffect(() => {
    const getReesponsible = async () => {
      const res = await Axios.post(
        apiUrl + "/api/user/responsible",
        {
          company: User.company,
          department: departmentName,
        },
        { headers: { "auth-token": token } }
      );
      setResponsible(res.data.name);
    };
    if (departmentName !== "") {
      getReesponsible();
    }
  }, [departmentName, token]);

  //

  const CreateQuickTask = async () => {
    if (file === "") {
      uploadData();
    } else {
      const image = new FormData();
      image.append("image", file, fileName);
      await Axios.post(apiUrl + "/api/img/uploadimage", image, {
        headers: { "Content-Type": "multipart-formData", "auth-token": token },
        onUploadProgress: (ProgressEvent) => {
          setUploadProcentage(
            parseInt(
              Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
            )
          );
          setTimeout(() => setUploadProcentage(0), 10000);
        },
      });
      uploadData();
    }
  };

  const uploadData = async () => {
    try {
      await Axios.post(
        apiUrl + "/api/quicktask/create",
        {
          company: User.company,
          image: fileName,
          issue: issue,
          area: departmentName, //nav
          responsible: responsible,
          coment: coments,
          deadline: deadline,
          creator: User.name,
          creatorDep: User.department,
          observation: ob, //nav
          priority: priority,
          safetyCategory: safetyCategory,

          //
        },
        { headers: { "auth-token": token } }
      );
      setComent("");
      setDeadline("");
      setDepartmentName("");
      setFile("");
      setFileName("");
      setIsue("");
      setObservation("");
      setPriority("");
      setResponsible("");
      setSafetyCategory("");
      toast.success("Novērojums izveidots");
      setFileName("");
      setFile("");
      updatePage();
    } catch (e) {
      toast.error("check if department has appointed responsible");
    }
  };
  const fileSelected = (e) => {
    setFile(e.target.files[0]);
    setFileName(User.company + Date.now() + Math.random() * 9999 + ".jpg");
  };

  return (
    <Modal show={crModalStatus} size="xl">
      <Modal.Header>
        <h3 style={{ fontWeight: "bold", color: "#ff6600" }}>
          Create new observation
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Row>
            <Col>
              <h4>
                Description<b style={{ color: "red" }}>*</b>
              </h4>
              <textarea
                style={{ width: "100%" }}
                type="text"
                name="apraksts"
                value={issue}
                rows={5}
                onChange={(e) => setIsue(e.target.value)}
              />
            </Col>
            <Col>
              <h4>Actions</h4>
              <textarea
                style={{ width: "100%" }}
                type="text"
                name="darbības"
                value={coments}
                rows={5}
                onChange={(e) => setComent(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>
                Departament<b style={{ color: "red" }}>*</b>
              </h4>
              <CustomDropdown
                api={"/api/plant/all/department"}
                placeholders={"Department"}
                setValue={(value) => setDepartmentName(value.name)}
                jsonName2="departmentName"
                jsonName="departmentName"
                defaultValue={departmentName}
              />
            </Col>
            <Col>
              <h4>Add photo</h4>
              <input type="file" onChange={(e) => fileSelected(e)} />
              <div style={{ marginTop: "1%" }}>
                <ProgressBar animated now={uploadProcentage} />
              </div>
            </Col>
            <Col></Col>

            <Col>
              <h4>Priority</h4>
              <PriorityDropdown
                prio={(e) => setPriority(e.selected)}
                defaultValue={priority}
              />
            </Col>
            <Col>
              <h4>
                Observation<b style={{ color: "red" }}>*</b>
              </h4>
              <ObservationTypeDropdown
                defaultValue={ob}
                prio={(res) => setObservation(res.selected)}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "2%" }}>
            <Col>
              <h4>Safety category</h4>
              <Form>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Unsafe environment"
                    checked={
                      safetyCategory === "Unsafe environment"
                        ? true
                        : false || ""
                    }
                    onChange={() =>
                      setSafetyCategory(
                        safetyCategory === "Unsafe environment"
                          ? ""
                          : "Unsafe environment"
                      )
                    }
                    color="green"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Unsafe action"
                    checked={
                      safetyCategory === "Unsafe action" ? true : false || ""
                    }
                    onChange={() =>
                      setSafetyCategory(
                        safetyCategory === "Unsafe action"
                          ? ""
                          : "Unsafe action"
                      )
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Accident"
                    checked={safetyCategory === "Accident" ? true : false || ""}
                    onChange={() =>
                      setSafetyCategory(
                        safetyCategory === "Accident" ? "" : "Accident"
                      )
                    }
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col style={{ marginRight: "-11%" }}>
              <h4>Deadline</h4>
              <Datums setDate={(a) => setDeadline(a)} />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginLeft: "1%" }}>
              <Row>
                <b style={{ color: "red" }}>*</b>
                <h5>Mandatory fields</h5>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          floated="left"
          variant="danger"
          size="sm"
          onClick={() => createModal()}
        >
          Exit
        </Button>
        <Button size="sm" variant="success" onClick={() => CreateQuickTask()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickTaskCreateModal;
