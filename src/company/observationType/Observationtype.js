import React, { useEffect, useContext } from "react";
import ObsTabel from "./ObservationTable";
import obsFunc from "../funcTypes/obsFunc";
import ObservationHeader from "./ObservationHeader";
import ObsTypeCreate from "./ObsTypeCreate";
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
      <Container>
        <div>
          <ObservationHeader />
          <ObsTabel />
          <ObsTypeCreate />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ObservationType;
