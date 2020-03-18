import React from "react";
import decode from "./DecodingFunction";
import "./Question.css";

export const Question = props => {
  return (
    <div id="component">
      <div id="question-line">
        <div id="line" />
        {
          // When you want to do only the positive part of the ternary, you can do: condition && <component>
          // or Boolean(condition) && <component>
        }
        {props.state.question ? <div className="arrow-left" /> : ""}
        <div id="question">{decode(props.state.question)}</div>
        {props.state.question ? <div className="arrow-right" /> : ""}
      </div>
    </div>
  );
};
