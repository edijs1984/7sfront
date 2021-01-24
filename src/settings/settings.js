import React from "react";

import { Button, Row, Card } from "react-bootstrap";

import "./settings.css";
import { Link } from "react-router-dom";
const Settings = () => {
  return (
    <React.Fragment>
      <div className="settingsGrid">
        <Row>
          <Row>
            <div>
              <Button
                variant={"primary"}
                style={{ height: "100%", width: "80%" }}
                as={Link}
                to="/company"
              >
                <Card size="massive" color="orange" />

                <h2>Company Management</h2>
              </Button>
            </div>
            <div>
              <Button
                style={{ height: "100%", width: "80%" }}
                as={Link}
                to="/user/create"
              >
                <Card size="massive" color="orange" />
                <h2>User Management</h2>
              </Button>
            </div>
            <div>
              <Button
                style={{ height: "100%", width: "80%" }}
                as={Link}
                to="/auditrulles"
              >
                <Card size="massive" color="orange" />
                <h2>Audit Management</h2>
              </Button>
            </div>
          </Row>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Settings;
