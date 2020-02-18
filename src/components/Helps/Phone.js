import React, { Component } from "react";
import "./Phone.css";
import "./cross.css";
import {checkCorrectAnswer} from './checkCorrectAnswer'

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperShow: false,
      helpersLoaded: "",
      HelperNames: [],
      HelperChoose: "",
      HelperClicked: false,
      HelperAnswer: "",
      helperActivated: false
    };
  }

  stateToApp = () => {
    let currentState = this.state;
    this.props.handlePhone(currentState);
  };

  getHelpers = () => {
    console.log("Hey");
    let url = "https://randomuser.me/api/?results=4";

    this.setState({ helpersLoaded: false }, () => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            HelperNames: [
              data.results[0].name.first,
              data.results[1].name.first,
              data.results[2].name.first,
              data.results[3].name.first
            ],
            HelpersImages: [
              data.results[0].picture.medium,
              data.results[1].picture.medium,
              data.results[2].picture.medium,
              data.results[3].picture.medium
            ]
          });
        })
        .then(this.setState({ helpersLoaded: true }));
    });
  };

  helperClick = input => {
    this.setState({
      HelperChoose: input,
      HelperClicked: !this.state.HelperClicked
    });
  };

  helperAnswer = (props) => {
    let activeQuestion = this.props.state.activeQuestion;
    let correctAnswer = checkCorrectAnswer(this.props.state);
    let answersArrayEasy = [
      `Que burro! É a ${correctAnswer}!`,
      `Não há que enganar. É a ${correctAnswer}!`,
      `É a ${correctAnswer}!`,
      `Vai com tudo para a ${correctAnswer}!`
    ];

    let answersArrayMedium = [
      `I don't know for sure, but I guess it's ${correctAnswer}`,
      `It's ${correctAnswer}!`,
      `I guess it's A`,
      `Go for B, you can trust me!`
    ];
    let answersArrayHard = [
      `Sorry, I don't know`,
      `It's ${correctAnswer}. Thank God you called me for this!`,
      `I guess it's D`,
      `You should called to another friend. Try C, I guess.`
    ];

    if (activeQuestion < 5) {
      this.setState({
        HelperAnswer:
          answersArrayEasy[Math.floor(Math.random() * answersArrayEasy.length)],
        helperShow: true,
        helperActivated: true
      });
    } else if (activeQuestion > 4 && activeQuestion < 10) {
      this.setState({
        HelperAnswer:
          answersArrayMedium[
            Math.floor(Math.random() * answersArrayMedium.length)
          ],
        helperShow: true,
        helperActivated: true
      });
    } else if (activeQuestion > 9) {
      this.setState({
        HelperAnswer:
          answersArrayHard[Math.floor(Math.random() * answersArrayHard.length)],
        helperShow: true,
        helperActivated: true
      });
    }

    setTimeout(() => this.stateToApp(), 1000);
  };

  render() {
    return (
      <div id="help">
        <div
          className={
            "cross" +
            " " +
            (!this.props.state.phoneHelpState.helperActivated
              ? "help-to-activate"
              : "help-activated")
          }
          id="right"
          onClick={() => {
            this.getHelpers();
            this.helperAnswer();
          }}
          style={{
            pointerEvents: this.props.state.phoneHelpState.helperActivated
              ? "none"
              : ""
          }}
        />
        <div
          className={
            "cross" +
            " " +
            (!this.props.state.phoneHelpState.helperActivated
              ? "help-to-activate"
              : "help-activated")
          }
          id="left"
        />
        <div
          className="phone-icon"
          onClick={() => {
            this.getHelpers();
            this.helperAnswer();
          }}
          style={{
            pointerEvents: this.props.state.phoneHelpState.helperActivated
              ? "none"
              : ""
          }}
        />
      </div>
    );
  }
}

export default Phone;
