import React, { useState, createContext, useEffect } from "react";
import { Post } from "../helpers/axioPost";
import * as Api from "../apiLinks/httpAudit";

export const AuditContext = createContext();
export const AuditProvider = (props) => {
  const [auditRulles, setAuditRulles] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);
  const [createModal, setCreateModal] = useState(false);

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
    await Post({
      api: Api.auditRullesCreateApi,
      data: {
        sofs: data.family,
        issue: data.issue,
        inspectable: data.inspectable,
        rating: [
          { point1: data.point1, rulle1: data.rulle1 },
          { point2: data.point2, rulle2: data.rulle2 },
          { point3: data.point3, rulle3: data.rulle3 },
        ],
      },
      message: "Rulle created",
      notifytrue: true,
    });
  };

  const auditFunctions = async (data) => {
    switch (data.type) {
      case "getRulles":
        getRulles();
        break;
      case "getFamilyOptions":
        getFamilyoptions();
        break;
      case "createModal":
        setCreateModal(!createModal);
        break;
      case "deleteRulles":
        console.log(data);
        break;
      case "editRulles":
        console.log(data);
        console.log("open edit modal");
        break;
      case "createFamilyOptions":
        console.log(data);
        break;
      case "editFamilyOptions":
        console.log(data);
        break;
      case "deleteFamilyOptions":
        console.log(data);
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
      value={{ auditRulles, familyOptions, auditFunctions, createModal }}
    >
      {props.children}
    </AuditContext.Provider>
  );
};
