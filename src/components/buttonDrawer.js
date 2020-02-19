import React, { Component } from "react";
import "./buttonDrawer.css";

export const ButtonDrawer = props => {
  return (
    <div className="drawer-button" onClick={() => props.hideShowDrawer()}>
      <div className="bar-button1" id="bar1"></div>
      <div className="bar-button1" id="bar2"></div>
      <div className="bar-button2" id="bar3"></div>
      <div className="bar-button2" id="bar4"></div>
    </div>
  );
};
