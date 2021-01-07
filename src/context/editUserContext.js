import React, { useState, createContext, useEffect } from "react";
import { Post, Patch, Company } from "../helpers/axioPost";
export const EditUserContext = createContext();
export const EditUserProvider = (props) => {
  const [editUserData, setEditUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [createUserModal, setCreateUSerModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [placesWithoutManager, setPlacesWithoutManager] = useState([]);

  //get all places
  const getPlaces = async () => {
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
      api: "/api/user/all",
      notifytrue: true,
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

  const deleteUser = async (id) => {
    const res = await Post({
      api: "/api/user/delete",
      data: id,
    });
    setAllUsers(res);
  };

  const openCloseCreateUserModal = () => {
    setCreateUSerModal(!createUserModal);
  };
  const openCloseEditUserModal = () => {
    setEditUserModal(!editUserModal);
  };

  const updateUser = () => {};

  useEffect(() => {
    getAllUsers();
    getPlaces();
    console.log("user context rendering");
  }, []);
  console.log(allUsers);
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
      }}
    >
      {props.children}
    </EditUserContext.Provider>
  );
};
