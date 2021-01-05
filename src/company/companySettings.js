import React, { useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import Level2Modal from "./level2Modal";
import Axios from "axios";
import { apiUrl } from "../config.json";
import { AuthContext } from "../context/auth";
import { ToastContext } from "./../context/toastContext";
import MainTable from "./companyTable/mainTable";

// import { ButtonGroup } from "semantic-ui-react";

const CompanySettings = () => {
  const [modal2Status, setModal2Status] = useState(false);

  //others
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const { notify, badNotify } = useContext(ToastContext);

  //open modals
  const openModal2 = () => {
    setModal2Status(!modal2Status);
  };

  //post data

  const createData2 = async (data) => {
    if (!data.value) {
      return badNotify("all fields must be filled");
    }
    try {
      await Axios.post(
        apiUrl + "/api/plant/create/department",
        {
          company: user.company,
          creator: user.name,
          departmentName: data.data.name,
        },
        { headers: { "auth-token": token } }
      );
      notify("Created successfully");
    } catch (e) {
      badNotify(e.message);
    }
  };
  return (
    <div>
      <h1 style={{ color: "#ff6600", marginTop: "2%", marginBottom: "2%" }}>
        Place Settings
      </h1>

      <Button onClick={() => openModal2()}> Create Place</Button>
      <Container fluid>
        <div style={{ marginTop: 20 }}>
          <MainTable company={user.company} token={token} />
        </div>
      </Container>
      <Level2Modal
        modal2Status={modal2Status}
        openModal2={openModal2}
        createData2={createData2}
      />
    </div>
  );
};
export default CompanySettings;
