import React from "react";
import decoding from "./DecodingFunction";
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
  const letter = ["A", "B", "C", "D"];

  return letter[input];
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
              // instead of disabling the pointer-events, to this check in the onClick handler. If you're not supposed to do anything, then return right away
              pointerEvents:
                (props.activated5050 &&
                  (index === props.answersToRemove[0] ||
                    index === props.answersToRemove[1])) ||
                props.questionAnswered
                  ? "none"
                  : "",
              fontSize: props.isMobile ? "1rem" : ""
            }}
          >
            <div
              id="arrow-left"
              className={
                props.answers[index] === props.correctAnswer &&
                props.showingCorrectAnswer
                  ? "arrow-left-correct"
                  : props.answers[index] === props.selectedAnswer
                  ? "arrow-left-answered"
                  : "arrow-left-answer"
              }
            />
            <div
              id="answer"
              className={
                props.answers[index] === props.correctAnswer &&
                props.showingCorrectAnswer
                  ? "correct"
                  : props.answers[index] === props.selectedAnswer
                  ? "answered"
                  : "answer"
              }
              style={{
                color:
                  props.activated5050 &&
                  (index === props.answersToRemove[0] ||
                    index === props.answersToRemove[1])
                    ? "transparent"
                    : ""
              }}
            >
              <span
                style={{
                  color:
                    props.activated5050 &&
                    (index === props.answersToRemove[0] ||
                      index === props.answersToRemove[1])
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
                props.answers[index] === props.correctAnswer &&
                props.showingCorrectAnswer
                  ? "arrow-right-correct"
                  : props.answers[index] === props.selectedAnswer
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
