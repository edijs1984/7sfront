import React, { createContext, useState, useEffect, useReducer } from "react";
import { Post, User } from "../helpers/axioPost";

import * as Api from "../apiLinks/httpUsers";
export const UserContext = createContext();
export const UserProvider = (props) => {
  //user state
  const [allUsers, setAllUsers] = useState([]);
  const [modal, setModal] = useState({ createModal: false, editModal: false });

  //functions
  const deleteUser = async (data) => {
    await Post({
      api: Api.userDeleteApi,
      data: { id: data },
      message: "User Deleted",
      notifytrue: true,
    });
    getAllUsers();
  };
  const getAllUsers = async () => {
    const res = await Post({
      api: Api.userAllApi,
    });
    setAllUsers(res);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const changePassword = async (data) => {
    await Post({
      api: Api.userChangePasswordApi,
      data: { id: User._id, password: data },
      message: "Password changed",
      notifytrue: true,
    });
  };

  const resetPassword = async (id) => {
    await Post({
      api: Api.userResetPasswordApi,
      data: { id: id },
      message: "Pasword reset done,email sent",
      notifytrue: true,
    });
  };

  const editUser = async (data) => {
    await Post({
      api: Api.userEditApi,
      data: {
        id: data.id,
        workPlace: data.workPlace,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        manager: data.manager,
      },
      message: "User edited",
      notifytrue: true,
    });
    getAllUsers();
    setModal({ ...modal, editModal: false });
  };

  const createUser = async (data) => {
    await Post({
      api: Api.userCreateApi,
      data: {
        name: data.name,
        email: data.email,
        workPlace: data.workPlace,
        isAdmin: data.isAdmin,
        manager: data.manager,
        responsibleForPlace: data.responsibleForPlace,
      },
      message: "User Created",
      notifytrue: true,
    });
    getAllUsers();
  };

  //reducer function
  const dispatch = async (data) => {
    switch (data.type) {
      case "getAllUsers":
        getAllUsers();
        break;
      case "createUserModal":
        setModal({ ...modal, createModal: !modal.createModal });
        break;
      case "editUserModal":
        setModal({ ...modal, editModal: !modal.editModal });
        break;
      case "deleteUser":
        deleteUser(data.payload.id);
        break;
      case "editUser":
        editUser(data.payload);
        break;
      case "resetPassword":
        resetPassword(data.payload);
        break;
      case "changePassword":
        changePassword(data.payload);
        break;
      case "createUser":
        createUser(data.payload);
        break;
      default:
        console.log(data.type);
    }
  };

  //reducer state

  return (
    <UserContext.Provider
      value={{
        allUsers,
        User,
        dispatch,
        modal,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
