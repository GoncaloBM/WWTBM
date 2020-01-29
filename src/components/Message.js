import React from "react";
import decode from "./DecodingFunction";
import './Message.css'

export const Message = props => {
  return (
    <div
      className={`message-screen
      ${props.state.messageHidden ? "hidden-message" : "show-message"}
    `}
    >
      {decode(props.state.messagem)}
    </div>
  );
};
