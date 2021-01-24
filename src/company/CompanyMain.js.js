import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Place from "./place.js";
import SettingsMenuBar from "../comonComponents/settingMenuBar.js";

const MainCompanyPage = () => {
  return (
    <div>
      <SettingsMenuBar />
      <Carousel
        showArrows={false}
        centerMode={false}
        style={{ backgroundColor: "white" }}
      >
        <div style={{ backgroundColor: "white" }}>
          <Place />
        </div>
        <div>
          <Place />
        </div>
        <div>
          <img src="assets/3.jpeg" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default MainCompanyPage;
