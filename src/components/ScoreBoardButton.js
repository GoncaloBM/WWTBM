import React from "react";
import "./ScoreBoardButton.css";

export const ScoreBoardButton = props => {
  return (
    <div
      id="score-line"
      className={!props.scoreButtonHidden ? "score-show" : "score-hidden"}
      onClick={props.toggleScoreBoard}
    >
      <div className="arrow-left-score" />
      <div className="score-game-button">
        {!props.toggleScoreBoardState ? "ScoreBoard" : "Back"}
      </div>
      <div className="arrow-right-score" />
    </div>
  );
};
