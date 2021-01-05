import React from "react";
import { Icon, Grid } from "semantic-ui-react";
import { Button } from "react-bootstrap";

import "./settings.css";
import { Link } from "react-router-dom";
const Settings = () => {
  return (
    <React.Fragment>
      <div className="settingsGrid">
        <Grid columns="3" divided>
          <Grid.Row>
            <div>
              <Button
                variant={"primary"}
                style={{ height: "100%", width: "80%" }}
                as={Link}
                to="/company"
              >
                <Icon name="building" size="massive" color="white" />

                <h2>Company Management</h2>
              </Button>
            </div>
            <div>
              <Button
                style={{ height: "100%", width: "80%" }}
                as={Link}
                to="/user/create"
              >
                <Icon name="user" size="massive" color="white" />
                <h2>User Management</h2>
              </Button>
            </div>
            <div>
              <Button
                style={{ height: "100%", width: "80%" }}
                as={Link}
                to="/auditrulles"
              >
                <Icon name="clipboard" size="massive" color="white" />
                <h2>Audit Management</h2>
              </Button>
            </div>
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Settings;
