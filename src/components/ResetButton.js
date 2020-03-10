import React from "react";
import "./ResetButton.css";

export const ResetButton = props => {
  return (
    <div
      id="reset-line"
      className={props.state.resetGameHidden ? "reset-hidden" : "reset-show"}
      onClick={() => {
        props.resetGame();
      }}
    >
      <div className="arrow-left-reset" />
      <div className="reset-game-button">Reset Game</div>
      <div className="arrow-right-reset" />
    </div>
  );
};
