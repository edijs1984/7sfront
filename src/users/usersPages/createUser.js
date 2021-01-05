import React, { useState, useContext, useEffect } from "react";
import CreateUserModal from "./createUserModal";
import UserTable from "./userTable";
import { AuthContext } from "../../context/auth";
import { apiUrl } from "../../config.json";
import Axios from "axios";
import { Button } from "react-bootstrap";
import { ToastContext } from "./../../context/toastContext";
const CreateUser = () => {
  const { notify, badNotify } = useContext(ToastContext);
  const [openModal, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("JwtToken");
  const modalManage = () => setModalOpen(!openModal);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await Axios.post(
        apiUrl + "/api/user/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
    };

    fetchResult();
  }, [user, token]);

  const deleteUser = async (val) => {
    try {
      await Axios.post(
        apiUrl + "/api/user/delete",
        {
          company: user.company,
          id: val,
        },
        { headers: { "auth-token": token } }
      );
      const res = await Axios.post(
        apiUrl + "/api/user/all",
        { company: user.company },
        { headers: { "auth-token": token } }
      );
      setPosts(res.data);
      notify("User deleted");
    } catch (e) {
      badNotify(e.message);
    }
  };
  const updateUser = async () => {
    const res = await Axios.post(
      apiUrl + "/api/user/all",
      { company: user.company },
      { headers: { "auth-token": token } }
    );
    setPosts(res.data);
  };
  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 style={{ fontWeight: "bold", color: "#ff6600", padding: "1%" }}>
        Users
      </h1>
      <Button
        onClick={modalManage}
        style={{ marginBottom: "1%", marginLeft: "1%" }}
        size="sm"
      >
        Create User
      </Button>
      <CreateUserModal
        openModal={openModal}
        modalManage={modalManage}
        setPosts={setPosts}
      />
      <UserTable
        currentPosts={currentPosts}
        paginate={paginate}
        posts={posts}
        postsPerPage={postPerPage}
        deleteUser={(val) => deleteUser(val)}
        updateUser={() => updateUser()}
      />
    </div>
  );
};

export default CreateUser;
