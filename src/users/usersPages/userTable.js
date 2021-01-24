import React, { useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { UserContext } from "../userContext";
import EditUserModal from "../editUser/editUserModal";

const UserTable = () => {
  const { dispatch, allUsers } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    workPlace: "",
    manager: false,
    isAdmin: false,
  });

  return !allUsers ? (
    <>...Loding</>
  ) : (
    <React.Fragment>
      <Table striped bordered hover size="sm">
        <thead
          style={{
            backgroundColor: "#2f3c48",
            color: "white",
            textAlign: "center",
          }}
        >
          <tr>
            <td>User Name</td>
            <td>User Email</td>
            <td>Workplace</td>
            <td>Manager</td>
            <td>Responsible</td>
            <td>Admin</td>
            <td>Reset</td>
            <td>Edit</td>
          </tr>
        </thead>

        <tbody>
          {allUsers.map((item) => {
            return (
              <tr key={item._id} style={{ textAlign: "center" }}>
                <td>{item.name} </td>
                <td>{item.email}</td>
                <td>{!item.workPlace ? "Non" : item.workPlace.placeName}</td>
                <td>{item.manager + ""}</td>
                <td>
                  {item.responsibleForPlace.map((obj) => {
                    return obj.placeName + ",";
                  })}
                </td>
                <td>{item.isAdmin + ""}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() =>
                      dispatch({ type: "resetPassword", payload: item._id })
                    }
                  >
                    Reset Password
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      setSelectedUser({
                        id: item._id,
                        name: item.name,
                        email: item.email,
                        workPlace: item.workPlace._id,
                        manager: item.manager,
                        isAdmin: item.isAdmin,
                        placeName: item.workPlace.placeName,
                      });
                      dispatch({ type: "editUserModal" });
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    style={{ marginLeft: "1%" }}
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      dispatch({
                        type: "deleteUser",
                        payload: { id: item._id },
                      })
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <EditUserModal selectedUser={selectedUser} />
    </React.Fragment>
  );
};
export default UserTable;
