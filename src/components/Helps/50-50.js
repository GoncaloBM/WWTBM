import React from "react";
import "./5050.css";

export const firstAnswersToRemove5050 = state => {
  /*
  This is correct but a bit strange, specially with the random while
  Maybe you could simplify this if you create a new array with only the incorrect answers. 
  This will ensure that you don't need to guard against removing the correct answer.
  With an array of incorrect answers, the logic is much simpler.
  We receive an array of incorrect answers already from the API. Maybe you can reuse it?
  */
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
    // You're already setting a class if drawer is hidden. If that class is available in a parent, you can do this styling logic in the css
    <div id="help" style={{ width: props.state.drawerHidden ? "125px" : "" }}>
      <div
        className={
          // classnames module will help you a TON.
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
