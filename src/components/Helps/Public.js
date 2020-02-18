import React, { Component } from "react";
import checkCorrectAnswer from "./checkCorrectAnswer";
import "./Public.css";
import "./cross.css";

class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageAnswer: [null, null, null, null],
      helperActivated: false
    };
  }

  stateToApp = () => {
    let currentState = this.state;
    this.props.handlePublic(currentState);
    this.props.publicClick();
  };

  publicAnswer = () => {
    let props = this.props;
    let activeQuestion = 1; //props.state.activeQuestion
    let correctAnswer = props.state.correctAnswer;
    let percentageCorrectAnswer;

    if (props.state.activeQuestion < 5) {
      percentageCorrectAnswer = Math.floor(Math.random() * 11) + 90;
    } else if (
      props.state.activeQuestion > 4 &&
      props.state.activeQuestion < 10
    ) {
      percentageCorrectAnswer = Math.floor(Math.random() * 11) + 50;
    } else if (props.state.activeQuestion > 9) {
      percentageCorrectAnswer = Math.floor(Math.random() * 11) + 40;
    }

    let percentageAnswer1 = Math.floor(
      Math.random() * (101 - percentageCorrectAnswer)
    );
    let percentageAnswer2 = Math.floor(
      Math.random() * (101 - percentageCorrectAnswer - percentageAnswer1)
    );
    let percentageAnswer3 = Math.floor(
      100 - percentageCorrectAnswer - percentageAnswer1 - percentageAnswer2
    );
    let arrayIncorrectPercentages = [
      percentageAnswer1,
      percentageAnswer2,
      percentageAnswer3
    ];

    let percentageArray = { ...this.state.percentageAnswer };

    console.log(percentageCorrectAnswer, arrayIncorrectPercentages);
    for (let i = 0; i < props.state.answers.length; i++) {
      if (props.state.answers[i] === correctAnswer) {
        percentageArray[i] = percentageCorrectAnswer;
      } else {
        for (let j = 0; j < arrayIncorrectPercentages.length; j++) {
          if (
            arrayIncorrectPercentages[j] !== null &&
            percentageArray[i] === null
          ) {
            percentageArray[i] = arrayIncorrectPercentages[j];
            arrayIncorrectPercentages[j] = null;
          }
        }
      }
    }

    this.setState({
      percentageAnswer: percentageArray,
      helperActivated: true
    });

    setTimeout(() => this.stateToApp(), 1000);
  };

  render() {
    return (
      <div id="help">
        <div
          className={
            "cross" +
            " " +
            (!this.props.state.publicHelpState.helperActivated
              ? "help-to-activate"
              : "help-activated")
          }
          id="right"
          onClick={() => {
            this.getHelpers();
            this.helperAnswer();
          }}
          style={{
            pointerEvents: this.props.state.publicHelpState.helperActivated
              ? "none"
              : ""
          }}
        />
        <div
          className={
            "cross" +
            " " +
            (!this.props.state.publicHelpState.helperActivated
              ? "help-to-activate"
              : "help-activated")
          }
          id="left"
        />

        <div
          className="public-icon"
          onClick={() => {
            this.publicAnswer();
          }}
          style={{
            pointerEvents: this.props.state.publicHelpState.helperActivated
              ? "none"
              : ""
          }}
        ></div>
      </div>
    );
  }
}

export default Public;
