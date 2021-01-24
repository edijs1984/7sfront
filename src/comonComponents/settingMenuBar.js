import React, { useState } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

const SettingsMenuBar = () => {
  const path = useLocation().pathname;

  return (
    <div style={{ marginTop: "1%" }}>
      <Nav variant="tabs" activeKey={path}>
        <Nav.Item style={{ color: "red" }}>
          <Nav.Link href="/company" as={Link} to="/company">
            Company
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/user/create" as={Link} to="/user/create">
            Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/auditrulles" as={Link} to="/auditrulles">
            Audit
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SettingsMenuBar;
