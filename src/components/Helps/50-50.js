import React, { Component } from "react";
import "./5050.css";

export const answersToRemove5050 = props => {
  let answersToRemove = [];
  let firstAnswerToRemove = Math.floor(Math.random() * 3);

  while (
    props.state.answers[firstAnswerToRemove] === props.state.correctAnswer
  ) {
    firstAnswerToRemove = Math.floor(Math.random() * 3);
  }

  if (props.state.answers[firstAnswerToRemove] !== props.state.correctAnswer) {
    answersToRemove.push(firstAnswerToRemove);
  }

  let secondAnswerToRemove = Math.floor(Math.random() * 3);

  while (
    secondAnswerToRemove === firstAnswerToRemove &&
    props.state.answers[secondAnswerToRemove] === props.state.correctAnswer
  ) {
    secondAnswerToRemove = Math.floor(Math.random() * 3);
  }

  if (props.state.answers[secondAnswerToRemove] !== props.state.correctAnswer) {
    answersToRemove.push(secondAnswerToRemove);
  }

  return answersToRemove;
};

export const Help5050 = props => {
  return <div className="help5050"></div>;
};
