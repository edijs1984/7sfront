import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import SettingsMenuBar from "../comonComponents/settingMenuBar";
import PlaceTabel from "./place/PlaceTable";
import PlacesHeader from "./place/placesHeader";
import { CompanyContext } from "./companyContetx";
import placeFunc from "./funcTypes/placeFunc";

const Places = () => {
  const { placeFunctions } = useContext(CompanyContext);
  useEffect(() => {
    placeFunctions({ type: placeFunc.getPlaces });
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
