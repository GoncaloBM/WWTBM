import React, { Component } from "react";
import "./ScoreBoardButton.css";

export const ScoreBoardButton = props => {
  return (
    <div
      id="score-line"
      className={!props.ScoreButtonHidden ? "score-show" : "score-hidden"}
      onClick={() => props.showScoreBoard()} // No need to create a new function here
    >
      <div className="arrow-left-score" />
      <div className="score-game-button">
        {!props.showScoreBoardState ? "ScoreBoard" : "Back"}
      </div>
      <div className="arrow-right-score" />
    </div>
  );
};
