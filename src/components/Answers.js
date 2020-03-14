import React from "react";
import decoding from "./DecodingFunction";
//import { firstAnswersToRemove5050, secondAnswerToRemove } from "./Helps/50-50";
import "./Answers.css";

export const initialQuestion = () => {
  return {
    drawerHidden: false,
    counterTime: 0,
    finalCount: 0,
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
    gameStart: false,
    messageHidden: true,
    startGameHidden: false,
    showingCorrectAnswer: false,
    activated5050: false,
    answersToRemove: [],
    help5050done: false,
    phoneHelpState: {},
    publicHelpState: {},
    publicHelpActivated: false,
    giveUpPrompted: false,
    endGame: false,
    resetGameHidden: true
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
    alert("Ola");
    window.localStorage.setItem("name", "Obaseki Nosa");
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
              props.answerClicked(index);
            }}
            style={{
              pointerEvents:
                (props.state.activated5050 &&
                  (index === props.state.answersToRemove[0] ||
                    index === props.state.answersToRemove[1])) ||
                props.state.questionAnswered
                  ? "none"
                  : "",
              fontSize: props.state.isMobile ? "1rem" : ""
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
                props.state.answers[index] === props.state.correctAnswer &&
                props.state.showingCorrectAnswer
                  ? "correct"
                  : props.state.answers[index] === props.state.selectedAnswer
                  ? "answered"
                  : "answer"
              }
              style={{
                color:
                  props.state.activated5050 &&
                  (index === props.state.answersToRemove[0] ||
                    index === props.state.answersToRemove[1])
                    ? "transparent"
                    : ""
              }}
            >
              <span
                style={{
                  color:
                    props.state.activated5050 &&
                    (index === props.state.answersToRemove[0] ||
                      index === props.state.answersToRemove[1])
                      ? "transparent"
                      : "",
                  fontFamily: "Copperplate-Gothic-Condensed"
                }}
              >
                {letterAnswer(index)}:
              </span>{" "}
              {decoding(item)}
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
