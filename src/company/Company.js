import React, { useContext, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import SettingsMenuBar from "../comonComponents/settingMenuBar";
import PlaceTabel from "./PlaceTable";
import PlacesHeader from "./placesHeader";
import Listgroup from "./ListGroup";
import { CompanyContext } from "./companyContetx";
import ObservationType from "./Observation";
const Company = () => {
  const { activePage, placeFunctions } = useContext(CompanyContext);
  useEffect(() => {
    placeFunctions({ type: "getAllPlaces" });
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
            <ObservationType />
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};
export default Company;
