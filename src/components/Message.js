import React from "react";
import decode from "./DecodingFunction";
import "./Message.css";

export const checkWinMessage = state => {
  let currentState = { ...state };

  if (currentState.activeQuestion < 15) {
    for (let i = 0; i < currentState.activeQuestion; i++) {
      if (currentState.activeQuestion === i + 1) {
        return currentState.questionAmount[i + 1];
      }
    }
  } else if (currentState.activeQuestion > 14) {
    return "You won 250 000€";
  }
};

export const checkLoseMessage = state => {
  const currentState = state;

  if (currentState.activeQuestion < 5) {
    return "0€";
  } else if (
    currentState.activeQuestion > 4 &&
    currentState.activeQuestion < 10
  ) {
    return currentState.questionAmount[4];
  } else if (currentState.activeQuestion > 9) {
    return currentState.questionAmount[9];
  }
};

export const Message = props => {
  return (
    <div
      className={`message-screen
      ${props.messageHidden ? "hidden-message" : "show-message"}
    `}
    >
      <div className="arrow-left-message"></div>
      <div className="message">{decode(props.messagem)}</div>
      <div className="arrow-right-message"></div>
    </div>
  );
};
