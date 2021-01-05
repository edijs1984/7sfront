import React, { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { apiUrl } from "../../../src/config.json";
import Axios from "axios";
import { AuthContext } from "../../context/auth";
import { ToastContext } from "./../../context/toastContext";

const LoginForm = () => {
  const context = useContext(AuthContext);
  const [approved, setapproved] = useState(false);
  const [Mail, setMail] = useState("");
  const [Pwd, setPwd] = useState("");
  const [code, setCode] = useState();
  const { notify, badNotify } = useContext(ToastContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(apiUrl + "/api/user/login", {
        email: Mail,
        password: Pwd,
      });
      console.log(res);
      if (res.status === 200) {
        setapproved(true);
        notify("Security code is sent");
        console.log("yes loged in");
      } else {
      }
    } catch (err) {
      badNotify("Email or password is wrong");
    }
  };

  const aproveResult = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(apiUrl + "/api/user/confirm", {
        email: Mail,
        password: Pwd,
        code: code,
      });
      if (res.status === 200) {
        context.login(res.data);

        window.location = "/quicktasks";
      }
    } catch (err) {
      badNotify("wrong code");
      setapproved(false);
    }
  };

  return approved === false ? (
    <Container fluid="sm">
      <Row className="justify-content-md-center">
        <div style={{ marginTop: "10%" }}>
          <h2 style={{ fontWeight: "bold" }}>7s web application</h2>
          <Form onSubmit={login}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setMail(e.target.value)}
                value={Mail}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={Pwd}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  ) : (
    <Container fluid="sm">
      <Row className="justify-content-md-center">
        <div style={{ marginTop: "20%" }}>
          <h2 style={{ fontWeight: "bold" }}>Please enter Code</h2>
          <Form onSubmit={aproveResult}>
            <Form.Group controlId="code">
              <Form.Control
                type="number"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Verify
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
};
export default LoginForm;
