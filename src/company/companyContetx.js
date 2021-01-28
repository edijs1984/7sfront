import React, { createContext, useState } from "react";
import { Post } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpPlaces";

export const CompanyContext = createContext();
export const CompanyProvider = (props) => {
  //
  const [activePage, setActivePage] = useState(1);
  const [modal, setModal] = useState(false);
  //
  const [places, setPlaces] = useState("");
  const [withoutManager, setWithoutManager] = useState([]);
  //
  const [selected, setSelected] = useState({});

  //functions
  const getAllPlaces = async () => {
    const result = await Post({ api: Api.placesAllApi });
    setPlaces(result);
  };

  const getWithoutManager = async () => {
    const result = await Post({ api: Api.placesWithoutMan });
    setWithoutManager(result);
  };

  const removePlace = async (data) => {
    const res = await Post({
      api: Api.placesDeletApi,
      data: data,
    });
    if (!res.error) {
      setPlaces(res);
    }
  };

  const createPlace = async (data) => {
    const res = await Post({
      api: Api.placesCreateApi,
      data: data,
    });
    if (!res.error) {
      setPlaces(res);
    }
  };

  const editPlace = async () => {
    const res = await Post({
      api: Api.placesEditApi,
      data: {
        id: selected.id,
        responsible: selected.user ? selected.user.value : "",
        placeName: selected.placeName,
      },
    });
    if (!res.error) {
      setPlaces(res);
      setModal(!modal);
    }
  };

  const placeFunctions = async (data) => {
    switch (data.type) {
      //create
      case "createPlace":
        createPlace(data.payload);
        break;
      //
      //edit
      case "closeEditModal":
        setModal(!modal);
        break;
      case "setEditModal":
        setModal(!modal);
        setSelected(data.payload);
        break;
      case "editSelected":
        setSelected(data.payload);
        break;
      case "editPlace":
        editPlace();
        break;
      //delete
      case "deletePlace":
        removePlace(data.payload);
        break;
      //querry
      case "getAllPlaces":
        getAllPlaces();
        break;
      case "withoutManager":
        getWithoutManager();
        break;

      //global company pages manager
      case "setActivePage":
        setActivePage(data.payload);
      default:
        alert(data.type);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        placeFunctions,
        modal,
        places,
        activePage,
        withoutManager,
        selected,
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};
