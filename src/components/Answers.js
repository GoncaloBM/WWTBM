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
    showingCorrectAnswer: false,
    activated5050 : false
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

const letterAnswer = input => {
  let letter = "";

  if (input === 0) {
    letter = "A";
  } else if (input === 1) {
    letter = "B";
  } else if (input === 2) {
    letter = "C";
  } else if (input === 3) {
    letter = "D";
  }

  return letter;
};

export const Answers = props => {
  return (
    <div id="answers">
      <div id="line-1" />
      <div id="line-2" />
      {props.answers.map((item, index) => {
        return (
          <div
            className="answer-line"
            key={index}
            onClick={() => {
              props.clickCallback(index);
            }}
          >
            <div
              id="arrow-left"
              className={
                props.state.answers[index] === props.state.correctAnswer &&
                props.state.showingCorrectAnswer
                  ? "arrow-left-correct"
                  : props.state.answers[index] === props.state.selectedAnswer
                  ? "arrow-left-answered"
                  : "arrow-left-answer"
              }
            />
            <div
              id="answer"
              className={
                // props.checkRightAnswer(index) === { index } &&
                props.state.answers[index] === props.state.correctAnswer &&
                props.state.showingCorrectAnswer
                  ? "correct"
                  : props.state.answers[index] === props.state.selectedAnswer
                  ? "answered"
                  : "answer"
              }
            >
              <span>{letterAnswer(index)}:</span> {decoding(item)}
            </div>
            <div
              id="arrow-right"
              className={
                props.state.answers[index] === props.state.correctAnswer &&
                props.state.showingCorrectAnswer
                  ? "arrow-right-correct"
                  : props.state.answers[index] === props.state.selectedAnswer
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
