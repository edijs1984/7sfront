import React, { useContext, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import SettingsMenuBar from "../comonComponents/settingMenuBar";
import PlaceTabel from "./place/PlaceTable";
import PlacesHeader from "./place/placesHeader";
import Listgroup from "./ListGroup";
import { CompanyContext } from "./companyContetx";

import ObservationHeader from "./observationType/ObservationHeader";
import placeFunc from "./funcTypes/placeFunc";
import obsFunc from "./funcTypes/obsFunc";
import ObsTabel from "./observationType/ObservationTable";

const Company = () => {
  const { activePage, placeFunctions, obsFunctions } = useContext(
    CompanyContext
  );
  useEffect(() => {
    placeFunctions({ type: placeFunc.getPlaces });
    obsFunctions({ type: obsFunc.getObservationTypes });
  }, []);
  return (
    <React.Fragment>
      <SettingsMenuBar />

      <Listgroup />
      <Container style={{ width: "80%" }}>
        {activePage === 1 ? (
          <div>
            <PlacesHeader />
            <PlaceTabel />
          </div>
        ) : (
          <div>
            <ObservationHeader />
            <ObsTabel />
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};
export default Company;
