import React, { useContext, useEffect } from "react";
import CreateUserModal from "../createUser/createUserModal";
import UserTable from "./userTable";
import { Button } from "react-bootstrap";
import { UserContext } from "../userContext";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";
import { TaskContext } from "../../tasks/taskContext";
const MainUserPage = () => {
  const { userFunctions } = useContext(UserContext);
  const { taskFunctions, tasks } = useContext(TaskContext);
  useEffect(() => {
    userFunctions({ type: "getAllUsers" });

    if (tasks.length < 1) {
      taskFunctions({ type: "getTasks" });
    }
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
