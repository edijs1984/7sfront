import React, { useEffect, useContext } from "react";
import ObsTabel from "./ObservationTable";
import obsFunc from "../funcTypes/obsFunc";
import ObservationHeader from "./ObservationHeader";
import ObsTypeCreate from "./ObsTypeCreate";
import SettingsMenuBar from "../../comonComponents/settingMenuBar";
import { Container } from "react-bootstrap";
import { CompanyContext } from "../companyContetx";
import { TaskContext } from "../../tasks/taskContext";

const ObservationType = () => {
  const { obsFunctions } = useContext(CompanyContext);
  const { taskFunctions, tasks } = useContext(TaskContext);
  useEffect(() => {
    obsFunctions({ type: obsFunc.getObservationTypes });
    if (tasks.length < 1) {
      taskFunctions({ type: "getTasks" });
    }
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
