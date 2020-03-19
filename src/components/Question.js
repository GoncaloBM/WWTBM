import React from "react";
import decode from "./DecodingFunction";
import "./Question.css";

export const Question = props => {
  return (
    <div id="component">
      <div id="question-line">
        <div id="line" />
        {props.question && <div className="arrow-left" />}
        <div id="question">{decode(props.question)}</div>
        {props.question && <div className="arrow-right" />}
      </div>
    </div>
  );
};
