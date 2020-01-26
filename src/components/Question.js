import React from "react";

export const initialQuestion = () => {
  return {
    activeQuestion: 0,
    messagem: "",
    answers: [],
    question: "",
    correctAnswer: "",
    isLoaded: false
  };
};

export const shuffle = arr => {
  var i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const checkVictory = (input, state) => {
  let currentState = { ...state };
  console.log(state);

  if (currentState.answers[input] === currentState.correctAnswer) {
    return true;
  } else {
    return false;
  }
};

export const Question = props => {
  return (
    <div id="answers">
      {props.answers.map((item, index) => {
        return (
          <div
            className="answer"
            key={index}
            //onClick={index => {
            //this.getNextState(index);
            onClick={() => {
              props.clickCallback(index);
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
