import React, { useState, useContext, useEffect } from "react";
import CreateAuditRullesModal from "./createAuditRullesModal";
import RullesTable from "./RullesTable";
import { AuditContext } from "../auditContext";

const AuditRulles = () => {
  const { auditFunctions } = useContext(AuditContext);

  useEffect(() => {
    auditFunctions({ type: "getFamilyOptions" });
    auditFunctions({ type: "getRulles" });
  }, []);

  // const createData = async (data) => {
  //   try {
  //     await Axios.post(
  //       apiUrl + "/api/auditrulles",
  //       {
  //         sofs: sofs,
  //         issue: data.issue,
  //         inspectable: data.inspectable,
  //         rating: [
  //           { point1: data.point1value, rulle1: data.point1rulles },
  //           { point2: data.point2value, rulle2: data.point2rulles },
  //           { point3: data.point3value, rulle3: data.point3rulles },
  //         ],
  //         creator: user._id,
  //         company: user.company,
  //       },
  //       { headers: { "auth-token": token } }
  //     );
  //     const res = await Axios.post(
  //       apiUrl + "/api/auditrulles/all",
  //       { company: user.company },
  //       { headers: { "auth-token": token } }
  //     );
  //     setPosts(res.data);
  //     notify("Created successefully");
  //   } catch (e) {
  //     badNotify("something went wrong");
  //   }
  // };

  // const handleEdit = async (data) => {
  //   try {
  //     const res = await Axios.post(
  //       apiUrl + "/api/auditrulles/edit",
  //       {
  //         id: editData._id,
  //         sofs: sofs === "" ? editData.sofs : sofs,
  //         issue: data.issue,
  //         inspectable: data.inspectable,
  //         rating: [
  //           { point1: data.point1value, rulle1: data.point1rulles },
  //           { point2: data.point2value, rulle2: data.point2rulles },
  //           { point3: data.point3value, rulle3: data.point3rulles },
  //         ],
  //         changedBy: user.name,
  //         company: user.company,
  //       },
  //       {
  //         headers: { "auth-token": token },
  //       }
  //     );
  //     setPosts(res.data);
  //     notify("Rulle Updated");
  //   } catch (e) {
  //     badNotify("Something went wrong");
  //   }
  // };

  // const deleteData = async (data) => {
  //   try {
  //     await Axios.post(
  //       apiUrl + "/api/auditrulles/remove",
  //       { company: user.company, id: data },
  //       { headers: { "auth-token": token } }
  //     );
  //     const res = await Axios.post(
  //       apiUrl + "/api/auditrulles/all",
  //       { company: user.company },
  //       { headers: { "auth-token": token } }
  //     );
  //     setPosts(res.data);
  //     notify("Rulle Removed");
  //   } catch (e) {
  //     badNotify(e.message);
  //   }
  // };

  return (
    <React.Fragment>
      <RullesTable />
      <CreateAuditRullesModal />
    </React.Fragment>
  );
};

export default AuditRulles;
