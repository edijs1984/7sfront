import React, { useState, useContext } from "react";
import CreateUserModal from "../createUser/createUserModal";
import UserTable from "./userTable";
import { Button } from "react-bootstrap";
import { EditUserContext } from "../../context/editUserContext";
import EditUserModal from "../editUser/editUserModal";
const MainUserPage = () => {
  const { allUsers, openCloseCreateUserModal } = useContext(EditUserContext);
  console.log(allUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = allUsers.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 style={{ fontWeight: "bold", color: "#ff6600", padding: "1%" }}>
        Users
      </h1>
      <Button
        onClick={openCloseCreateUserModal}
        style={{ marginBottom: "1%", marginLeft: "1%" }}
        size="sm"
      >
        Create User
      </Button>
      <CreateUserModal />
      <EditUserModal />
      <UserTable
        currentPosts={currentPosts}
        paginate={paginate}
        posts={allUsers}
        postsPerPage={postPerPage}
      />
    </div>
  );
};

export default MainUserPage;
