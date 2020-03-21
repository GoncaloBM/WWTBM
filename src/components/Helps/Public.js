import React, { Component } from "react";
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
    this.props.publicHelpCallback(currentState);
    this.props.publicClick();
  };

  publicAnswer = () => {
    let props = this.props;
    let correctAnswer = props.correctAnswer;
    let percentageCorrectAnswer;

    if (props.activeQuestion < 5) {
      percentageCorrectAnswer = Math.floor(Math.random() * 11) + 90;
    } else if (props.activeQuestion > 4 && props.activeQuestion < 10) {
      percentageCorrectAnswer = Math.floor(Math.random() * 11) + 50;
    } else if (props.activeQuestion > 9) {
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

    let percentageArray = { ...this.state.percentageAnswer }; // this doesn't seem right. If you want to create a new array from another your should use square brackets

    for (let i = 0; i < props.answers.length; i++) {
      if (props.answers[i] === correctAnswer) {
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
    const props = this.props;
    var classNames = require("classnames");

    let cross = classNames(
      "cross",
      { "help-activated": props.publicHelpState.helperActivated },
      { "help-to-activate": !props.publicHelpState.helperActivated }
    );

    return (
      <div id="help" style={{ width: props.drawerHidden ? "125px" : "" }}>
        <div
          className={cross}
          id="right"
          style={{
            pointerEvents: props.publicHelpState.helperActivated ? "none" : ""
          }}
        />
        <div className={cross} id="left" />

        <div
          className="public-icon"
          onClick={this.publicAnswer}
          style={{
            // Instead of disabling with CSS, you can do the check inside the onClick handler.
            //  If `this.props.state.publicHelpState.helperActivated` is true, do an early return, effectively not doing anything :P
            pointerEvents: props.publicHelpState.helperActivated ? "none" : ""
          }}
        />
      </div>
    );
  }
}

export default Public;
