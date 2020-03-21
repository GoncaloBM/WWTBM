import React from "react";
import "./GiveUpButton.css";

export const GiveUpMessage = props => {
  var classNames = require("classnames");
  let messageLine = classNames(
    "give-message-line",
    { "give-message-show": props.giveUpPrompted },
    { "give-message-hidden": !props.giveUpPrompted }
  );
  return (
    <div className={messageLine}>
      <div className="give">
        <div className="arrow-left-give"></div>
        <div className="give-question">Are You Sure?</div>
        <div className="arrow-right-give"></div>
      </div>
      <div className="yes-no-line">
        <div className="button" onClick={props.giveUp}>
          Yes
        </div>
        <div className="button" onClick={props.giveUpClick}>
          No
        </div>
      </div>
    </div>
  );
};
