import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../userContext";

const Myprofile = () => {
  const { User, userFunctions } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const change = () => {
    if (password === newPassword) {
      userFunctions({ type: "changePassword", payload: password });
    } else setMessage("Password doest match");
    setNewPassword("");
    setPassword("");
  };

  return (
    <div style={{ marginLeft: "40%", width: "15%", marginTop: "10%" }}>
      <h1>{User.name || ""}</h1>

      <Form>
        <Form.Group>
          <Form.Label>NewPassword</Form.Label>
          <Form.Control
            placeholder="NewPassword"
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
            value={password}
            type="password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm NewPassword</Form.Label>
          <Form.Control
            placeholder="Confirm NewPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
          />
        </Form.Group>

        <h5 style={{ color: "red" }}>{message}</h5>

        <Button onClick={() => change()} variant="success">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Myprofile;
