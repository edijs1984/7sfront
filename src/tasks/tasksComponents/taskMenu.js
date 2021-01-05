import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const TaskMenu = () => {
  return (
    <div>
      <h1 style={{ fontWeight: "bold", color: "#ff6600", padding: "1%" }}>
        Tasks
      </h1>
      <Nav variant="tabs" defaultActiveKey="/tasks" style={{ marginTop: 10 }}>
        <Nav.Item>
          <Nav.Link active as={Link} to="/tasks">
            Tasks
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/quicktasks">
            Quick Tasks
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/newtask">
            New Task
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
export default TaskMenu;
