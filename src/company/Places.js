import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import SettingsMenuBar from "../comonComponents/settingMenuBar";
import PlaceTabel from "./place/PlaceTable";
import PlacesHeader from "./place/placesHeader";
import { CompanyContext } from "./companyContetx";
import { TaskContext } from "../tasks/taskContext";

import placeFunc from "./funcTypes/placeFunc";

const Places = () => {
  const { placeFunctions } = useContext(CompanyContext);
  const { taskFunctions, tasks } = useContext(TaskContext);
  useEffect(() => {
    placeFunctions({ type: placeFunc.getPlaces });
    if (tasks.length < 1) {
      taskFunctions({ type: "getTasks" });
    }
  }, []);
  return (
    <React.Fragment>
      <SettingsMenuBar />

      <Container style={{ width: "80%" }}>
        <div>
          <PlacesHeader />
          <PlaceTabel />
        </div>
      </Container>
    </React.Fragment>
  );
};
export default Places;
