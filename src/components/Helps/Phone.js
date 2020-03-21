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

  helperAnswer = () => {
    let props = this.props;
    let activeQuestion = props.activeQuestion;
    let correctAnswer = checkCorrectAnswer(props.correctAnswer, props.answers);
    let answersArrayEasy = [
      `Que burro! É a ${correctAnswer}!`, // Ahahahah!
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
        <div className={cross} id="right" onClick={this.phoneClick} />
        <div className={cross} id="left" />
        <div
          className="phone-icon"
          onClick={this.phoneClick}
          style={{
            pointerEvents: props.phoneHelpState.helperActivated ? "none" : ""
          }}
        />
      </div>
    );
  }
}

export default Phone;
