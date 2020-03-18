import React from "react";
import "./Phone.css";

export const PhoneMenu = props => {
  /**
   * There's a lot of "props." going on.
   * After you pass the props directly, you can use destructuring in the arguments to make the code a bit less verbose 
   */
  return (
    <div
      className={
        props.state.phoneHelpState.helperShow
          ? "helper-position-activated"
          : "helper-position"
      }
    >
      {props.state.phoneHelpState.loadError && ( // no need to create a new function
        <div className="thanks" onClick={() => props.phoneHelperGone()}> 
          <div className="arrow-left-thanks" />
          <div className="phone-help-question">Sorry :(</div>
          <div className="arrow-right-thanks" />
        </div>
      )}

      {!props.state.phoneHelpState.loadError && (
        <div className="phone-help-question-line">
          <div className="arrow-left-phone" />
          <div className="phone-help-question">Who do you want to phone?</div>
          <div className="arrow-right-phone" />
        </div>
      )}

      {props.state.phoneHelpState.helpersLoaded === true && // helpersLoaded is a boolean. No need to check if it's true.
      !props.state.phoneHelpState.loadError ? ( // this is an nested ternary. Hard to read. Maybe move these long conditions into one or two variables in the top of the function
        <div className="helpers">
          {props.state.phoneHelpState.HelperNames.map((item, index) => {
            return (
              <div
                key={index}
                className={ // classnames
                  props.state.phoneHelpState.HelperClicked === false // the left side is a boolean. You can do the same by negating the value. No need to compare.
                    ? "helpers-line"
                    : props.state.phoneHelpState.HelperChoose === index
                    ? "helpers-line-chosen"
                    : "helpers-line-not-chosen"
                }
              >
                <img
                  className={
                    props.state.phoneHelpState.HelperClicked === true // No need to check if true
                      ? "img-chosen"
                      : ""
                  }
                  src={props.state.phoneHelpState.HelpersImages[index]}
                  alt=""
                  onClick={() => props.helperClick(index)} // since you pass a value here, this is one example of where a new arrow function is needed
                />
                <div className="name-answer">
                  {props.state.phoneHelpState.HelperClicked === true // no need for the === true
                    ? props.state.phoneHelpState.HelperAnswer
                    : item}
                </div>
                {props.state.phoneHelpState.HelperClicked === true && ( // no need for the === true
                  <div
                    className="thanks"
                    onClick={() => props.phoneHelperGone()} // no need for the new function
                  >
                    <div className="arrow-left-thanks" />
                    <div className="phone-help-question">Thanks!</div>
                    <div className="arrow-right-thanks" />
                  </div>
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
