import React, { useContext, useEffect } from "react";
import CreateUserModal from "../createUser/createUserModal";
import UserTable from "./userTable";
import { Button } from "react-bootstrap";
import { UserContext } from "../userContext";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";

const MainUserPage = () => {
  const { userFunctions } = useContext(UserContext);
  useEffect(() => {
    userFunctions({ type: "getAllUsers" });
  }, []);
  return (
    <div>
      <SettingsMenuBar />
      <h1 style={{ color: "#2f3c48", padding: "1%" }}>Users</h1>
      <Button
        onClick={() => userFunctions({ type: "createUserModal" })}
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
