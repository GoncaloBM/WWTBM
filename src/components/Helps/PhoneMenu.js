import React from "react";
import "./Phone.css";

export const PhoneMenu = props => {
  return (
    <div className="helper-position">
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
                onClick={() => props.helperClick(index)}
              >
                <img
                  className={
                    props.state.phoneHelpState.HelperClicked === true ? "img-chosen" : ""
                  }
                  src={props.state.phoneHelpState.HelpersImages[index]}
                  alt=""
                />
                <div>
                  {props.state.phoneHelpState.HelperClicked === true
                    ? props.state.phoneHelpState.HelperAnswer
                    : item}
                </div>
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
