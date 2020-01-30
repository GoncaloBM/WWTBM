import React from "react";
import decoding from "./DecodingFunction";
import "./Answers.css";

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
    questionAmmout: [
      "25€",
      "50€",
      "125€",
      "250€",
      "500€",
      "750€",
      "1 500€",
      "2 500€",
      "5 000€",
      "10 000€",
      "16 000€",
      "32 000€",
      "64 000€",
      "125 000€",
      "250 000 €"
    ],
    questionHidden: true,
    messageHidden: true,
    startGameHidden: false,
    showingCorrectAnswer: false
  };
};

export const checkMessage = state => {
  let currentState = { ...state };

  for (let i = 0; i < currentState.activeQuestion; i++) {
    if (currentState.activeQuestion === i + 1) {
      return currentState.questionAmmout[i + 1];
    }
  }
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

export const Answers = props => {
  return (
    <div id="answers">
      {props.answers.map((item, index) => {
        return (
          <div
            className="answer-line"
            key={index}
            //onClick={index => {
            //this.getNextState(index);
            onClick={() => {
              props.clickCallback(index);
            }}
          >
            <div
              className={
                props.state.answers[index] === props.state.selectedAnswer
                  ? "arrow-left-answered"
                  : "arrow-left-answer"
              }
            />
            <div
              className={
                props.checkCorrectAnswer() === index && props.checkCorrectAnswer
                  ? "corrected"
                  : props.state.answers[index] === props.state.selectedAnswer
                  ? "answered"
                  : "answer"
              }
            >
              {decoding(item)}
            </div>
            <div
              className={
                props.state.answers[index] === props.state.selectedAnswer
                  ? "arrow-right-answered"
                  : "arrow-right-answer"
              }
            />
          </div>
        );
      })}
    </div>
  );
};
