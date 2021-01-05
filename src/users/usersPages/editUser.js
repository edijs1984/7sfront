import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/auth";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import { ToastContext } from "./../../context/toastContext";
import CustomInput from "../../comonComponents/customInput";

const EditUser = () => {
  const { notify, badNotify } = useContext(ToastContext);
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const createData = async () => {
    if (password !== newPassword) {
      badNotify("passwords doesn't match");
    } else {
      try {
        await Axios.patch(
          apiUrl + "/api/user/update",
          {
            id: user._id,
            comp: user.company,
            password: password
          },
          { headers: { "auth-token": token } }
        );

        notify("Password changed");
        setPassword("");
        setNewPassword("");
      } catch (e) {
        badNotify(e);
      }
    }
  };

  return (
    <div style={{ marginLeft: "40%" }}>
      <div
        style={{
          width: "60%"
        }}
      >
        <div style={{ margin: "15%" }}>
          <h1>{user.name || ""}</h1>
        </div>
        <Form style={{ margin: "15%" }}>
          <h4>New Password</h4>
          <CustomInput
            currentValue={password}
            handl={res => setPassword(res)}
            type="password"
          />
          <div style={{ marginTop: "5%" }}>
            <h4>Confirm New paasword</h4>
            <CustomInput
              currentValue={newPassword}
              handl={res => setNewPassword(res)}
              type="password"
            />
          </div>
          <div style={{ marginTop: "5%" }}>
            <Button onClick={() => createData()} variant="success">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
