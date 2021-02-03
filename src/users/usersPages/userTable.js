import React, { useState, useContext } from "react";
import { Table, Row } from "react-bootstrap";
import { UserContext } from "../userContext";
import { TaskContext } from "../../tasks/taskContext";
import EditUserModal from "../editUser/editUserModal";
import DeleteBtn from "../../comonComponents/buttons/deleteButton";
import ResetBtn from "../../comonComponents/buttons/resetButton";
import { countTasks } from "../../helpers/countUsers";
import { paginate } from "../../helpers/paginate";
import Paggination from "../../comonComponents/Paggination";

const UserTable = () => {
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { userFunctions, allUsers } = useContext(UserContext);
  const { tasks } = useContext(TaskContext);

  //pagin
  const handlePageChange = (data) => {
    setCurrentPage(data);
  };
  const users = paginate(allUsers, currentPage, pageSize);

  return !users ? (
    <>...Loding</>
  ) : (
    <React.Fragment>
      <Row style={{ margin: "1%" }}>
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
              <td>Open observations</td>
              <td>Manager</td>
              <td>Responsible</td>
              <td>Admin</td>
              <td>Delete</td>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => {
              return (
                <tr
                  key={item._id}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onDoubleClick={() => {
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
                >
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
                  <td>{countTasks(tasks, item._id)}</td>
                  <td>{item.manager + ""}</td>
                  <td>
                    {item.responsibleForPlace !== []
                      ? item.responsibleForPlace.map((value, index) => {
                          return (
                            value.placeName +
                            (index !== item.responsibleForPlace.length - 1
                              ? ", "
                              : ".")
                          );
                        })
                      : ""}
                  </td>
                  <td>{item.isAdmin + ""}</td>
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
      </Row>
      <Row className="justify-content-md-center">
        <Paggination
          pageSize={pageSize}
          count={allUsers.length}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Row>
      <EditUserModal />
    </React.Fragment>
  );
};
export default UserTable;
