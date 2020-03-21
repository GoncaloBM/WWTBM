import React from "react";
import "./buttonDrawer.css";

export const ButtonDrawer = props => {
  var classNames = require("classnames");

  let barButton1 = classNames(
    "bar-button1",
    { "bar-button-hidden": !props.drawerHidden },
    { "drawer-button-start": !props.drawerHidden }
  );

  let barButton2 = classNames(
    "bar-button2",
    { "bar-button-hidden": props.drawerHidden },
    { "drawer-button-start": props.drawerHidden }
  );

  let startGame = classNames(
    { "drawer-button": props.startGame },
    { "drawer-button-start": !props.startGame }
  );

  return (
    <div className={startGame} onClick={props.hideShowDrawer}>
      <div className={barButton1} id="bar1" />
      <div className={barButton1} id="bar2" />
      <div className={barButton2} id="bar3" />
      <div className={barButton2} id="bar4" />
    </div>
  );
};
