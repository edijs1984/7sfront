import React, { useState, createContext, useEffect } from "react";
import { Post } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpAudit";

export const AuditContext = createContext();
export const AuditProvider = (props) => {
  const [auditRulles, setAuditRulles] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [selectedRulle, setSelectedRulle] = useState();
  const [editRullesModal, setEditRullesModal] = useState(false);

  const getRulles = async () => {
    const res = await Post({
      api: Api.auditRullesGetAllRullesApi,
    });
    setAuditRulles(res);
  };

  const getFamilyoptions = async () => {
    const res = await Post({
      api: Api.auditFamilyOptions,
    });
    setFamilyOptions(res);
  };

  const createRulles = async (data) => {
    const res = await Post({
      api: Api.auditRullesCreateApi,
      data: {
        sofs: data.family,
        issue: data.issue,
        inspectable: data.inspectable,
        point1: data.point1,
        rulle1: data.rulle1,
        point2: data.point2,
        rulle2: data.rulle2,
        point3: data.point3,
        rulle3: data.rulle3,
      },
    });
    if (!res.error) {
      setAuditRulles(res);
    }
  };

  const auditRullesdelete = async (value) => {
    const res = await Post({
      api: Api.auditRullesDeleteApi,
      data: { id: value },
    });

    if (!res.error) {
      setAuditRulles(res);
    }
  };

  const editAuditRulle = async () => {
    const res = await Post({
      api: Api.auditRullesEditApi,
      data: {
        id: selectedRulle._id,
        issue: selectedRulle.issue,
        inspectable: selectedRulle.inspectable,
        rulle1: selectedRulle.rulle1,
        point1: selectedRulle.point1,
        rulle2: selectedRulle.rulle2,
        point2: selectedRulle.point2,
        rulle3: selectedRulle.rulle3,
        point3: selectedRulle.point3,
        sofs: selectedRulle.sofs,
      },
    });
    if (!res.error) {
      setAuditRulles(res);
      setEditRullesModal(!editRullesModal);
    }
  };

  const auditFunctions = async (data) => {
    switch (data.type) {
      case "getRulles":
        getRulles();
        break;
      case "getFamilyOptions":
        getFamilyoptions();
        break;
      case "editSelectedRulle":
        setSelectedRulle(data.payload);
        break;
      case "createModal":
        setCreateModal(!createModal);
        break;
      case "deleteRulles":
        auditRullesdelete(data.payload);
        break;
      case "editRulles":
        setSelectedRulle(data.payload);
        setEditRullesModal(!editRullesModal);
        break;
      case "closeEditModal":
        setEditRullesModal(!editRullesModal);
        break;
      case "editRulle":
        editAuditRulle();
        break;
      case "createRulle":
        createRulles(data.payload);
        break;
      default:
        console.log(data);
    }
  };

  return (
    <AuditContext.Provider
      value={{
        auditRulles,
        familyOptions,
        auditFunctions,
        selectedRulle,
        createModal,
        editRullesModal,
      }}
    >
      {props.children}
    </AuditContext.Provider>
  );
};
