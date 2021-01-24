import React, { useContext } from "react";
import CreateUserModal from "../createUser/createUserModal";
import UserTable from "./userTable";
import { Button } from "react-bootstrap";
import { UserContext } from "../userContext";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";

const MainUserPage = () => {
  const { dispatch } = useContext(UserContext);

  return (
    <div>
      <SettingsMenuBar />
      <h1 style={{ fontWeight: "bold", color: "#2f3c48", padding: "1%" }}>
        Users
      </h1>
      <Button
        onClick={() => dispatch({ type: "createUserModal" })}
        style={{ marginBottom: "1%", marginLeft: "1%" }}
        size="sm"
      >
        Create User
      </Button>
      <CreateUserModal />
      <UserTable />
    </div>
  );
};

export default MainUserPage;
