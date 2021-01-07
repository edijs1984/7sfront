import React, { useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import Pagin from "../../comonComponents/pagination";
import { EditUserContext } from "../../context/editUserContext";

const UserTable = ({ currentPosts, paginate, posts, postsPerPage }) => {
  const {
    setSelectedUser,
    resetPassword,
    deleteUser,
    openCloseEditUserModal,
  } = useContext(EditUserContext);

  return (
    <React.Fragment>
      <Table size="sm">
        <thead>
          <tr style={{ fontSize: 18, color: "#ff6600", textAlign: "center" }}>
            <td>User Name</td>
            <td>User Email</td>
            <td>Department</td>
            <td>Manager</td>
            <td>Responsible</td>
            <td>Admin</td>
            <td>Reset</td>
            <td>Edit</td>
          </tr>
        </thead>

        <tbody>
          {currentPosts.map((item) => {
            return (
              <tr key={item._id} style={{ textAlign: "center" }}>
                <td>{item.name} </td>
                <td>{item.email}</td>
                <td>{!item.department ? "NON" : item.department}</td>
                <td>{item.maneger + ""}</td>
                <td>
                  {item.responsible.map((obj, index) => {
                    return obj + ", ";
                  })}
                </td>
                <td>{item.isAdmin + ""}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => {
                      resetPassword(item._id);
                    }}
                  >
                    Reset Password
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      setSelectedUser(item);
                      openCloseEditUserModal();
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteUser(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagin
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      {/* <EditUserModal
        selected={selected}
        openModal={openModal}
        modalManage={() => modalManage()}
        updateUser={() => updateUser()}
      /> */}
    </React.Fragment>
  );
};
export default UserTable;
