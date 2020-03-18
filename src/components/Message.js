import React from "react";
import decode from "./DecodingFunction";
import "./Message.css";

// const messageStatus = props => {
//   let currentMessage = "";

//   currentMessage = props.state.questionAmmout[props.state.activeQuestion + 1];

//   return currentMessage;
// };

export const checkWinMessage = state => {
  let currentState = { ...state };

  for (let i = 0; i < currentState.activeQuestion; i++) {
    if (currentState.activeQuestion === i + 1) {
      return currentState.questionAmmout[i + 1];
    }
  }
};

export const CheckLoseMessage = state => {
  let currentState = { ...state }; // no need to create a copy. You're not changing the object. Can be a constant.

  if (currentState.activeQuestion < 5) {
    return "0€";
  } else if (
    currentState.activeQuestion > 4 &&
    currentState.activeQuestion < 10
  ) {
    return currentState.questionAmmout[4];
  } else if (currentState.activeQuestion > 9) {
    return currentState.questionAmmout[9];
  }
};

export const Message = props => {
  return (
    <div
      className={`message-screen
      ${props.state.messageHidden ? "hidden-message" : "show-message"}
    `}
    >
      <div className="arrow-left-message"></div>
      <div className="message">{decode(props.state.messagem)}</div>
      <div className="arrow-right-message"></div>
    </div>
  );
};
