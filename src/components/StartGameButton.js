import React from "react";
import "./StartGameButton.css";

export const StartGameButton = props => {
  return (
    <div
      id="start-line"
      className={props.state.startGameHidden ? "start-hidden" : "start-show"}
      onClick={() => {
        props.clickCallback();
      }}
    >
      <div className="arrow-left-start" />
      <div className="start-game-button">Start Game</div>
      <div className="arrow-right-start" />
    </div>
  );
};
