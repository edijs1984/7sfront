import React, { createContext, useState, useEffect, useReducer } from "react";
import { Post, User } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpUsers";

//
export const UserContext = createContext();
export const UserProvider = (props) => {
  //user state
  const [allUsers, setAllUsers] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState({});

  //functions
  const deleteUser = async (data) => {
    const res = await Post({
      api: Api.userDeleteApi,
      data: { id: data },
    });
    if (!res.error) {
      setAllUsers(res);
    }
  };

  const getAllUsers = async () => {
    const res = await Post({
      api: Api.userAllApi,
    });
    if (!res.error) {
      setAllUsers(res);
    }
  };

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

  const editUser = async () => {
    const res = await Post({
      api: Api.userEditApi,
      data: {
        id: selected.id,
        workPlace: selected.place.value,
        name: selected.name,
        email: selected.email,
        isAdmin: selected.isAdmin,
        manager: selected.manager,
      },
    });
    if (!res.error) {
      setAllUsers(res);
      setSelected({});
      setEditModal(!editModal);
    }
  };

  const createUser = async (data) => {
    const res = await Post({
      api: Api.userCreateApi,
      data: {
        name: data.name,
        email: data.email,
        workPlace: data.workPlace,
        isAdmin: data.isAdmin,
        manager: data.manager,
        responsibleForPlace: data.responsibleForPlace,
      },
    });
    if (!res.error) {
      setAllUsers(res);
    }
  };

  //export function
  const userFunctions = async (data) => {
    switch (data.type) {
      // query
      case "getAllUsers":
        getAllUsers();
        break;

      // create
      case "createUserModal":
        setCreateModal(!createModal);
        break;
      case "createUser":
        createUser(data.payload);
        break;

      // edit user
      case "editUserModal":
        setEditModal(!editModal);
        setSelected(data.payload);
        break;
      case "editSelected":
        setSelected(data.payload);
        break;
      case "editUser":
        editUser();
        break;
      case "closeEditModal":
        setEditModal(!editModal);
        break;
      case "deleteUser":
        deleteUser(data.payload.id);
        break;
      //

      case "resetPassword":
        resetPassword(data.payload);
        break;
      case "changePassword":
        changePassword(data.payload);
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
        userFunctions,
        createModal,
        editModal,
        selected,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
