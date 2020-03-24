import React, { Component } from "react";
import "./Phone.css";
import "./cross.css";
import { checkCorrectAnswer } from "./checkCorrectAnswer";

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
      helperActivated: false,
      loadError: false
    };
  }

  stateToApp = () => {
    let currentState = this.state;
    this.props.phoneHelpCallback(currentState);
  };

  getHelpers = () => {
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
        .then(this.setState({ helpersLoaded: true }))
        .catch(err => {
          this.setState({ ...this.state, loadError: true });
        });
    });
  };

  helperClick = input => {
    this.setState({
      HelperChoose: input,
      HelperClicked: !this.state.HelperClicked
    });
  };

  randomAnswer = (help5050Done, answersRemoved) => {
    let answersInGame = [0, 1, 2, 3];

    if (help5050Done) {
      for (let i = 0; i < answersInGame.length; i++) {
        for (let j = 0; j < answersRemoved.length; j++) {
          if (answersInGame[i] === answersRemoved[j]) {
            answersInGame.splice(i, 1);
          }
        }
      }
    }

    const indexOfAnswer =
      answersInGame[Math.floor(Math.random() * answersInGame.length)];

    switch (indexOfAnswer) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
    }
  };

  helperAnswer = () => {
    let props = this.props;
    let activeQuestion = props.activeQuestion;
    let correctAnswer = checkCorrectAnswer(props.correctAnswer, props.answers);
    let randomAnswer = this.randomAnswer(
      props.help5050done,
      props.answersToRemove
    );

    let answersArrayEasy = [
      `You don't know that?? It's ${correctAnswer}!`, // Ahahahah!
      `LOOOL it's ${correctAnswer}!`,
      `It's ${correctAnswer}, for sure!`,
      `Go ahed with ${correctAnswer}!`
    ];

    let answersArrayMedium = [
      `I don't know for sure, but I guess it's ${correctAnswer}`,
      `It's ${correctAnswer}!`,
      `I guess it's ${randomAnswer}`,
      `Go for ${randomAnswer}, you can trust me!`
    ];
    let answersArrayHard = [
      `Sorry, I don't know`,
      `It's ${correctAnswer}. Thank God you called me for this!`,
      `I guess it's ${randomAnswer}`,
      `You should called to another friend. Try ${randomAnswer}, I guess.`
    ];

    // This block has a lot of duplication. Maybe you can move the value for HelperAnswer into a function? It'll be much smaller.
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

  phoneClick = () => {
    this.getHelpers();
    this.helperAnswer();
  };

  render() {
    let props = this.props;
    var classNames = require("classnames");

    let cross = classNames(
      "cross",
      { "help-activated": props.phoneHelpState.helperActivated },
      { "help-to-activate": !props.phoneHelpState.helperActivated }
    );

    return (
      <div id="help" style={{ width: props.drawerHidden ? "125px" : "" }}>
        <div
          className={cross}
          id="right"
          onClick={!props.phoneHelpState.helperActivated && this.phoneClick}
        />
        <div className={cross} id="left" />
        <div
          className="phone-icon"
          onClick={!props.phoneHelpState.helperActivated && this.phoneClick}
        />
      </div>
    );
  }
}

export default Phone;
