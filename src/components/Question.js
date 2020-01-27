import React from "react";
import decoding from "./DecodingFunction";

export const initialQuestion = () => {
  return {
    activeQuestion: 0,
    messagem: "",
    answers: [],
    question: "",
    correctAnswer: "",
    questionAnswered: false,
    answerClicked: "",
    selectedAnswer: "",
    isLoaded: false,
    questionAmmout: {
      1: "25€",
      2: "50€",
      3: "125€",
      4: "250€",
      5: "500€",
      6: "750€",
      7: "1 500€",
      8: "2 500€",
      9: "5 000€",
      10: "10 000€",
      11: "16 000€",
      12: "32 000€",
      13: "64 000€",
      14: "125 000€",
      15: "250 000 €"
    },
    questionHidden : true
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
    <div
      id="answers"
    >
      {props.answers.map((item, index) => {
        return (
          <div
            className={
              props.selectedAnswer !== props.answers[index]
                ? "answer"
                : props.questionAnswered === false
                ? "answered"
                : "answer"
            }
            key={index}
            //onClick={index => {
            //this.getNextState(index);
            onClick={() => {
              props.clickCallback(index);
            }}
          >
            {decoding(item)}
          </div>
        );
      })}
    </div>
  );
};
