import React, { Component } from "react";
import "./buttonDrawer.css";

export const ButtonDrawer = props => {
  return (
    <div
      className={props.startGame ? "drawer-button" : "drawer-button-start"}
      onClick={() => props.hideShowDrawer()} // No need for this new arrow function
    >
      <div
        className={`bar-button1 ${ // when using a ternary, no need to compare with another boolean. Just negate it: !props.drawerHidden ? ....
          props.drawerHidden === false ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar1"
      />
      <div
        className={`bar-button1 ${ // same as above. Use maybe classnames
          props.drawerHidden === false ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar2"
      />
      <div
        className={`bar-button2 ${ // same as above. Use maybe classnames
          props.drawerHidden ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar3"
      />
      <div
        className={`bar-button2 ${ // same as above. Use maybe classnames
          props.drawerHidden ? "bar-button-hidden" : "bar-button-show"
        }`}
        id="bar4"
      />
    </div>
  );
};
