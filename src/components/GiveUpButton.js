import React from "react";
import "./GiveUpButton.css";

export const GiveUpButton = (props) => {
  return (
    <div className="give-up-line">
      <div className="give-up-icon" onClick={props.giveUpClick}>
        I Give Up
      </div>
    </div>
  );
};

export default GiveUpButton;
