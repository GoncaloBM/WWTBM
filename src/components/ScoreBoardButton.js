import React, { Component } from "react";
import "./ScoreBoardButton.css";

export const ScoreBoardButton = props => {
  return (
    <div
      id="score-line"
      className={!props.ScoreButtonHidden ? "score-show" : "score-hidden"}
    >
      <div className="arrow-left-score" />
      <div className="score-game-button">ScoreBoard</div>
      <div className="arrow-right-score" />
    </div>
  );
};
