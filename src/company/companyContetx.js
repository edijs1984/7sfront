import React, { createContext, useState, useContext, useEffect } from "react";
import { Post } from "../helpers/axioPost";
import { UserContext } from "../users/userContext";
import * as Api from "../apiLinks/httpPlaces";

export const CompanyContext = createContext();

export const CompanyProvider = (props) => {
  const { allUsers } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [places, setPlaces] = useState("");

  const getAllPlaces = async () => {
    const result = await Post({ api: Api.placesAllApi });
    setPlaces(result);
  };

  useEffect(() => {
    getAllPlaces();
  }, []);

  const removePlace = async (data) => {
    const res = await Post({
      api: Api.placesDeletApi,
      data: data,
    });
    setPlaces(res);
  };

  const createPlace = async (data) => {
    const res = await Post({
      api: Api.placesCreateApi,
      data: {
        placeName: data.placeName,
        responsible: data.userId,
      },
    });
    setPlaces(res);
  };

  const editPlace = async (data) => {
    const res = await Post({
      api: Api.placesEditApi,
      data: {
        id: data.id,
        responsible: data.userId,
        placeName: data.placeName,
      },
    });
    setPlaces(res);
    setModal(!modal);
  };

  const contextFunctions = async (data) => {
    switch (data.type) {
      case "setModal":
        setModal(!modal);
        break;
      case "getAllPlaces":
        getAllPlaces();
        break;
      case "deletePlace":
        removePlace(data.payload);
        break;
      case "createPlace":
        createPlace(data.payload);
        break;
      case "editPlace":
        editPlace(data.payload);
      default:
        console.log(data.type);
    }
  };

  return (
    <CompanyContext.Provider
      value={{ contextFunctions, modal, allUsers, places }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};
