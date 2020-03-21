import React from "react";
import "./Phone.css";

export const PhoneMenu = props => {
  let { phoneHelpState, phoneHelperGone, helperClick } = props;
  var classNames = require("classnames");

  let helperPosition = classNames(
    { "helper-position-activated": phoneHelpState.helperShow },
    { "helper-position": !phoneHelpState.helperShow }
  );

  return (
    <div className={helperPosition}>
      {props.phoneHelpState.loadError && (
        <div className="thanks" onClick={() => phoneHelperGone()}>
          <div className="arrow-left-thanks" />
          <div className="phone-help-question">Sorry :(</div>
          <div className="arrow-right-thanks" />
        </div>
      )}

      {!phoneHelpState.loadError && (
        <div className="phone-help-question-line">
          <div className="arrow-left-phone" />
          <div className="phone-help-question">Who do you want to phone?</div>
          <div className="arrow-right-phone" />
        </div>
      )}

      {phoneHelpState.helpersLoaded && !phoneHelpState.loadError && (
        <div className="helpers">
          {phoneHelpState.HelperNames.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  !phoneHelpState.HelperClicked
                    ? "helpers-line"
                    : phoneHelpState.HelperChoose === index
                    ? "helpers-line-chosen"
                    : "helpers-line-not-chosen"
                }
              >
                <img
                  className={phoneHelpState.HelperClicked ? "img-chosen" : ""}
                  src={phoneHelpState.HelpersImages[index]}
                  alt=""
                  onClick={() => helperClick(index)}
                />
                <div className="name-answer">
                  {phoneHelpState.HelperClicked
                    ? phoneHelpState.HelperAnswer
                    : item}
                </div>
                {phoneHelpState.HelperClicked && (
                  <div className="thanks" onClick={phoneHelperGone}>
                    <div className="arrow-left-thanks" />
                    <div className="phone-help-question">Thanks!</div>
                    <div className="arrow-right-thanks" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
