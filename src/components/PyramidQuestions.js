import React from "react";
import "./PyramidQuestion.css";

export const PyramidQuestions = props => {
  return (
    <div id="pyramid">
      <div
        id="current-question"
        style={{
          bottom: `${props.activeQuestion * 2 - 2}rem`,
          transition: "0.5s all"
        }}
      ></div>
      {props.questionAmmount.map((ammount, index) => {
        return (
          <div className="ammount-line">
            <div
              className="question-number"
              style={{
                color: props.activeQuestion === index + 1 ? "black" : ""
              }}
            >
              {index + 1}
            </div>
            <div className="question-answered">
              <div
                className={props.activeQuestion > index ? "square-rot" : ""}
              ></div>
            </div>
            <div
              className="ammount"
              style={{
                color: props.activeQuestion === index + 1 ? "black" : ""
              }}
            >
              {ammount}
            </div>
          </div>
        );
      })}
    </div>
  );
};
