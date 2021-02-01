import React, { createContext, useState } from "react";
import { Post } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpCompany";
import placeFunc from "./funcTypes/placeFunc";
import obsFunc from "./funcTypes/obsFunc";

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
  //
  const [obsTypes, setObsTypes] = useState([]);
  const [obsEditModal, SetObsEditModal] = useState(false);
  const [obsCreateModal, setObsCreateModal] = useState(false);
  const [selectedObs, setSelectedObs] = useState({});

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

  const getObservationTypes = async () => {
    const res = await Post({
      api: Api.obsTypeAllApi,
    });
    if (!res.error) {
      setObsTypes(res);
    }
  };

  const createObsType = async (data) => {
    const res = await Post({
      api: Api.obsTypeCreate,
      data: {
        observationName: data.observationName,
        observationCategory: data.observationCategory,
      },
    });
    if (!res.error) {
      setObsTypes(res);
    }
  };

  const deleteObservationtype = async (data) => {
    const res = await Post({
      api: Api.obstypeDelete,
      data: {
        id: data,
      },
    });
    if (!res.error) {
      setObsTypes(res);
    }
  };

  const editObservation = async () => {
    const res = await Post({ api: Api.obsTypeEdit, data: selectedObs });

    if (!res.error) {
      SetObsEditModal(!obsEditModal);
      setObsTypes(res);
    }
  };

  // exported func
  const placeFunctions = async (data) => {
    switch (data.type) {
      //create
      case placeFunc.createPlace:
        createPlace(data.payload);
        break;
      //
      //edit
      case placeFunc.closeEditPlaceModal:
        setModal(!modal);
        break;
      case placeFunc.EditPlaceModal:
        setModal(!modal);
        setSelected(data.payload);
        break;
      case placeFunc.editSelectedData:
        setSelected(data.payload);
        break;
      case placeFunc.editPlace:
        editPlace();
        break;
      //delete
      case placeFunc.deletePlace:
        removePlace(data.payload);
        break;
      //querry
      case placeFunc.getPlaces:
        getAllPlaces();
        break;
      case placeFunc.getPlacesWithoutManager:
        getWithoutManager();
        break;

      default:
        alert(data.type);
    }
  };

  const companyFunctions = async (data) => {
    switch (data.type) {
      //create
      case "setActivePage":
        setActivePage(data.payload);
        break;
      default:
        alert(data.type);
    }
  };

  // Obs func export
  const obsFunctions = async (data) => {
    switch (data.type) {
      //create
      case obsFunc.createObservationType:
        createObsType(data.payload);
        break;
      case obsFunc.editObservationtype:
        editObservation();
        break;
      case obsFunc.deleteObservationtype:
        deleteObservationtype(data.payload);
        break;
      case obsFunc.editObservationtypeModal:
        setSelectedObs(data.payload);
        SetObsEditModal(!obsEditModal);
        break;
      case obsFunc.closeEditObservationTypeModal:
        SetObsEditModal(!obsEditModal);
        break;
      case obsFunc.getObservationTypes:
        getObservationTypes();
        break;
      case obsFunc.obsCreateModal:
        setObsCreateModal(!obsCreateModal);
        break;
      case obsFunc.editObsSelected:
        setSelectedObs(data.payload);
        break;

      default:
        alert(data.type);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        placeFunctions,
        companyFunctions,
        obsFunctions,
        modal,
        places,
        activePage,
        withoutManager,
        selected,
        obsTypes,
        placeFunc,
        obsFunc,
        obsCreateModal,
        selectedObs,
        obsEditModal,
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};
