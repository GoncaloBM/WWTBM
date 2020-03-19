import React from "react";
import "./StartGameButton.css";

export const StartGameButton = props => {
  return (
    <div
      id="start-line"
      className={props.startGameHidden ? "start-hidden" : "start-show"}
      onClick={() => {
        props.startGame();
      }}
    >
      <div className="arrow-left-start" />
      <div className="start-game-button">Start Game</div>
      <div className="arrow-right-start" />
      <div id="lines">
        <div id="left-line" />
        <div id="right-line" />
      </div>
    </div>
  );
};
