import React, { useState, useContext, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Navbar, Nav } from "react-bootstrap";
const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [curentUser, setCurrentUser] = useState("User");
  const [comp, setComp] = useState("Company");

  const [active, setActive] = useState("/quicktask");

  useEffect(() => {
    if (!user) {
      return null;
    }
    setCurrentUser(user.name);
    setComp(user.company);
  }, [user]);

  const CompanyStyle = {
    color: "White",
    fontSize: 24,
  };
  const linkStyles = {
    color: "white",
    fontSize: 18,
  };
  const activated = {
    color: "orange",
    fontSize: 18,
  };
  const menu = (
    <div>
      <Navbar bg="primary" variant="primary">
        <Navbar.Brand style={CompanyStyle}>{comp}</Navbar.Brand>
        <Nav
          className="mr-auto"
          activeKey="/quicktask"
          onSelect={(selectedKey) => setActive(selectedKey)}
        >
          <Nav.Link
            as={Link}
            to="/quicktasks"
            style={active === "/quicktask" ? activated : linkStyles}
            href="/quicktask"
          >
            Observations
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/audit"
            style={active === "/audit" ? activated : linkStyles}
            href="/audit"
          >
            Audit
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/dashboard"
            style={active === "/dashboard" ? activated : linkStyles}
            href="/dashboard"
          >
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav
          className="m-right"
          onSelect={(selectedKey) => setActive(selectedKey)}
        >
          {!user ? (
            ""
          ) : user.isAdmin ? (
            <Nav.Link
              as={Link}
              to="/settings"
              style={active === "/settings" ? activated : linkStyles}
              href="/settings"
            >
              Settings
            </Nav.Link>
          ) : (
            ""
          )}
          <Nav.Link
            as={Link}
            to="/user/edit"
            style={active === "/user/edit" ? activated : linkStyles}
            href="/user/edit"
          >
            {curentUser}
          </Nav.Link>
        </Nav>
        <Nav.Link onClick={logout} style={linkStyles}>
          LogOut
        </Nav.Link>
      </Navbar>
    </div>
  );

  if (!user) {
    return <Redirect to="/login" />;
  }

  return menu;
};
export default MenuBar;
