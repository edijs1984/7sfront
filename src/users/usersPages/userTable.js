import React, { useState, useContext, useEffect } from "react";
import { Row, Table } from "react-bootstrap";
import { UserContext } from "../userContext";
import EditUserModal from "../editUser/editUserModal";
import DeleteBtn from "../../comonComponents/buttons/deleteButton";
import EditBtn from "../../comonComponents/buttons/editButton";
import ResetBtn from "../../comonComponents/buttons/resetButton";

const UserTable = () => {
  const { userFunctions, allUsers } = useContext(UserContext);

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
            <td>Reset password</td>
            <td>User Name</td>
            <td>User Email</td>
            <td>Workplace</td>
            <td>Manager</td>
            <td>Responsible</td>
            <td>Admin</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>

        <tbody>
          {allUsers.map((item) => {
            return (
              <tr key={item._id} style={{ textAlign: "center" }}>
                <td style={{ width: "8%" }}>
                  <ResetBtn
                    onClick={() =>
                      userFunctions({
                        type: "resetPassword",
                        payload: item._id,
                      })
                    }
                  />
                </td>
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
                <td style={{ width: "4%" }}>
                  <EditBtn
                    onClick={() => {
                      userFunctions({
                        type: "editUserModal",
                        payload: {
                          id: item._id,
                          name: item.name,
                          email: item.email,
                          manager: item.manager,
                          isAdmin: item.isAdmin,
                          place: {
                            value: item.workPlace._id,
                            label: item.workPlace.placeName,
                          },
                        },
                      });
                    }}
                  />
                </td>
                <td style={{ width: "4%" }}>
                  <DeleteBtn
                    onClick={() =>
                      userFunctions({
                        type: "deleteUser",
                        payload: { id: item._id },
                      })
                    }
                  />
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
