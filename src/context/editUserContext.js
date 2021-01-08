import React, { useState, createContext, useEffect } from "react";
import { Post, Patch, Company } from "../helpers/axioPost";

import {
  userEditApi,
  userDeleteApi,
  userAllApi,
} from "../httpHooks/httpUserEndpoints";
export const EditUserContext = createContext();

export const EditUserProvider = (props) => {
  //common state
  const [allUsers, setAllUsers] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [placesWithoutManager, setPlacesWithoutManager] = useState([]);
  //createuser state
  const [createUserModal, setCreateUSerModal] = useState(false);
  //edituser state
  const [editUserModal, setEditUserModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [responsible, setResponsible] = useState([selectedUser.responsible]);
  //http
  //get all users

  // FUNCTIONS--------

  //get all places
  const getAllPlaces = async () => {
    const res = await Post({
      api: "/api/plant/all/department",
      notifytrue: false,
    });
    const value = res.filter(
      (value) => !value.responsible || value.responsible === ""
    );
    setAllPlaces(res);
    setPlacesWithoutManager(value);
  };

  //get all users
  const getAllUsers = async () => {
    const res = await Post({
      api: userAllApi,
    });
    setAllUsers(res);
  };

  //reset password
  const resetPassword = async (item) => {
    await Patch({
      api: "/api/user/reset",
      data: {
        id: item,
        company: Company,
      },
      notifytrue: true,
      message: "New password sent",
    });
  };
  //delete user
  const deleteUser = async (id) => {
    const res = await Post({
      api: userDeleteApi,
      data: id,
    });
    setAllUsers(res);
  };
  //create UserModal open close
  const openCloseCreateUserModal = () => {
    setCreateUSerModal(!createUserModal);
  };
  //edit user modal open close
  const openCloseEditUserModal = () => {
    setEditUserModal(!editUserModal);
    setResponsible([selectedUser.responsible]);
  };

  const updateUser = () => {};

  useEffect(() => {
    getAllUsers();
    getAllPlaces();
  }, []);

  // END
  return (
    <EditUserContext.Provider
      value={{
        editUserData,
        setEditUserData,
        allUsers,
        setAllUsers,
        openCloseCreateUserModal,
        openCloseEditUserModal,
        editUserModal,
        createUserModal,
        selectedUser,
        setSelectedUser,
        updateUser,
        resetPassword,
        deleteUser,
        allPlaces,
        placesWithoutManager,
        getAllUsers,
        getAllPlaces,
        responsible,
        setResponsible,
      }}
    >
      {props.children}
    </EditUserContext.Provider>
  );
};
