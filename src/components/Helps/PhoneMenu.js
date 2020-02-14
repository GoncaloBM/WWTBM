import React from "react";
import "./Phone.css";

export const PhoneMenu = props => {
  return (
    <div
      className={
        props.state.phoneHelpState.helperShow
          ? "helper-position-activated"
          : "helper-position"
      }
    >
      <div className="phone-help-question-line">
        <div className="arrow-left-phone" />
        <div className="phone-help-question">Who do you want to phone?</div>
        <div className="arrow-right-phone" />
      </div>

      {props.state.phoneHelpState.helpersLoaded === true ? (
        <div className="helpers">
          {props.state.phoneHelpState.HelperNames.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  props.state.phoneHelpState.HelperClicked === false
                    ? "helpers-line"
                    : props.state.phoneHelpState.HelperChoose === index
                    ? "helpers-line-chosen"
                    : "helpers-line-not-chosen"
                }
              >
                <img
                  className={
                    props.state.phoneHelpState.HelperClicked === true
                      ? "img-chosen"
                      : ""
                  }
                  src={props.state.phoneHelpState.HelpersImages[index]}
                  alt=""
                  onClick={() => props.helperClick(index)}
                />
                <div className="name-answer">
                  {props.state.phoneHelpState.HelperClicked === true
                    ? props.state.phoneHelpState.HelperAnswer
                    : item}
                </div>
                {props.state.phoneHelpState.HelperClicked === true && (
                  <button onClick={() => props.phoneHelperGone()}>
                    Thanks!
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
