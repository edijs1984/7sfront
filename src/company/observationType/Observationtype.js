import React, { useEffect, useContext } from "react";
import ObsTabel from "./ObservationTable";
import obsFunc from "../funcTypes/obsFunc";
import ObservationHeader from "./ObservationHeader";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";
import { Container } from "react-bootstrap";
import { CompanyContext } from "../companyContetx";

const ObservationType = () => {
  const { obsFunctions } = useContext(CompanyContext);
  useEffect(() => {
    obsFunctions({ type: obsFunc.getObservationTypes });
  }, []);
  return (
    <React.Fragment>
      <SettingsMenuBar />
      <Container style={{ width: "80%" }}>
        <div>
          <ObservationHeader />
          <ObsTabel />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ObservationType;
