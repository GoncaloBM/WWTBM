import React, { Component } from "react";
import "./buttonDrawer.css";

export const ButtonDrawer = props => {
  return (
    <div
      className={props.startGame ? "drawer-button" : "drawer-button-start"}
      onClick={() => props.hideShowDrawer()}
    >
      <div
        className={`bar-button1 ${
          props.drawerHidden === false ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar1"
      />
      <div
        className={`bar-button1 ${
          props.drawerHidden === false ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar2"
      />
      <div
        className={`bar-button2 ${
          props.drawerHidden ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar3"
      />
      <div
        className={`bar-button2 ${
          props.drawerHidden ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar4"
      />
    </div>
  );
};
