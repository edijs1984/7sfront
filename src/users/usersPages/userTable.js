import React, { useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import Pagin from "../../comonComponents/pagination";
import EditUserModal from "./editUserModal";
import { AuthContext } from "../../context/auth";
import Axios from "axios";
import { apiUrl } from "../../config.json";
import { ToastContext } from "./../../context/toastContext";
const UserTable = ({
  currentPosts,
  paginate,
  posts,
  postsPerPage,
  deleteUser,
  updateUser,
}) => {
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { notify, badNotify } = useContext(ToastContext);
  const token = localStorage.getItem("JwtToken");
  const { user } = useContext(AuthContext);

  const resetPassword = async (item) => {
    try {
      await Axios.patch(
        apiUrl + "/api/user/reset",
        {
          id: item,
          comp: user.company,
          password: Math.random().toString(36).replace("0.", ""),
        },
        { headers: { "auth-token": token } }
      );

      notify("Password reset is done");
      updateUser();
    } catch (e) {
      badNotify(e);
    }
  };

  const modalManage = () => setOpenModal(!openModal);

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
                      resetPassword(item._id, item.name);
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
                      setSelected(item);
                      modalManage();
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
      <EditUserModal
        selected={selected}
        openModal={openModal}
        modalManage={modalManage}
        updateUser={() => updateUser()}
      />
    </React.Fragment>
  );
};
export default UserTable;
