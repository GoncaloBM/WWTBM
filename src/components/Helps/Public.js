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
    this.props.publickHelpCallback(currentState);
    this.props.publicClick();
  };

  publicAnswer = () => {
    let props = this.props;
    let correctAnswer = props.state.correctAnswer;
    let percentageCorrectAnswer;

    if (props.activeQuestion < 5) {
      percentageCorrectAnswer = Math.floor(Math.random() * 11) + 90;
    } else if (
      props.activeQuestion > 4 &&
      props.activeQuestion < 10
    ) {
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
      <div
        id="help"
        style={{ width: this.props.drawerHidden ? "125px" : "" }} // if drawerHidden is in the above state, you can style this using CSS only.
      >
        <div
          className={ // classnames :D 
            "cross" +
            " " +
            (!this.props.state.publicHelpState.helperActivated
              ? "help-to-activate"
              : "help-activated")
          }
          id="right"
          onClick={() => { // move these two methods into a single method and use the reference here.
            this.getHelpers(); // this.getHelpers is not defined, right?
            this.helperAnswer(); // this.helperAnswer is not defined, right?
          }}
          style={{ // You have the className for "help-activated". You can style this using CSS. 
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
          id="left" // you use a whole lot of similar ids. This can be an issue as they shouldn't be replicated.
        />

        <div
          className="public-icon"
          onClick={() => {
            this.publicAnswer(); // no need for the new function here
          }}
          style={{ // Instead of disabling with CSS, you can do the check inside the onClick handler.
            //  If `this.props.state.publicHelpState.helperActivated` is true, do an early return, effectively not doing anything :P 
            pointerEvents: this.props.state.publicHelpState.helperActivated
              ? "none"
              : ""
          }}
        />
      </div>
    );
  }
}

export default Public;
