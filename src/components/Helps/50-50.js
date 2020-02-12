import React from "react";
import "./5050.css";

export const firstAnswersToRemove5050 = state => {
  let firstAnswerToRemove = Math.floor(Math.random() * 4);
  let secondAnswerToRemove = Math.floor(Math.random() * 4);
  let answersToRemove = [];

  while (state.answers[firstAnswerToRemove] === state.correctAnswer) {
    firstAnswerToRemove = Math.floor(Math.random() * 4);
  }

  answersToRemove.push(firstAnswerToRemove);

  while (
    state.answers[secondAnswerToRemove] === state.correctAnswer ||
    secondAnswerToRemove === firstAnswerToRemove
  ) {
    secondAnswerToRemove = Math.floor(Math.random() * 4);
  }

  answersToRemove.push(secondAnswerToRemove);

  return answersToRemove;
};

export const Help5050 = props => {
  return (
    <div id="help">
      <div
        className={
          "cross" +
          " " +
          (props.state.help5050done === false
            ? "help-to-activate"
            : "help-activated")
        }
        id="right"
        onClick={props.click5050}
      ></div>
      <div
        className={
          "cross" +
          " " +
          (props.state.help5050done === false
            ? "help-to-activate"
            : "help-activated")
        }
        id="left"
      ></div>
      <div
        className="help5050"
        onClick={props.click5050}
        style={{ pointerEvents: props.state.help5050done ? "none" : "" }}
      >
        50-50
      </div>
    </div>
  );
};
