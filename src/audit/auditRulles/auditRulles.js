import React, { useState, useContext, useEffect } from "react";
import CreateAuditRullesModal from "./createAuditRullesModal";
import RullesTable from "./RullesTable";
import { AuditContext } from "../auditContext";
import EditAuditRullesModal from "./EditAuditRullesModal";

const AuditRulles = () => {
  const { auditFunctions } = useContext(AuditContext);

  useEffect(() => {
    auditFunctions({ type: "getFamilyOptions" });
    auditFunctions({ type: "getRulles" });
  }, []);

  return (
    <React.Fragment>
      <RullesTable />
      <CreateAuditRullesModal />
      <EditAuditRullesModal />
    </React.Fragment>
  );
};

export default AuditRulles;
