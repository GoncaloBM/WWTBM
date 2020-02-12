import React, { Component } from "react";
import "./Phone.css";

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpersLoaded: "",
      HelperNames: [],
      HelperChoose: "",
      HelperClicked: false,
      HelperAnswer: ""
    };
  }

  stateToApp = () => {
    let currentState = this.state;
    this.props.handlePhone(currentState);
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
            ],
            helpersLoaded: true
          });
        });
    });
  };

  helperClick = input => {
    this.setState({
      HelperChoose: input,
      HelperClicked: !this.state.HelperClicked
    });
  };

  helperAnswer = props => {
    let activeQuestion = 1;
    //let correctAnswer = props.state.correctAnswer;
    let correctAnswer = "C";
    let answersArrayEasy = [
      `Que burro! É a ${correctAnswer}`,
      `Não há que enganar. É a ${correctAnswer}`,
      `É ${correctAnswer}`,
      `Vai com tudo para a ${correctAnswer}`
    ];

    let answersArrayMedium = [];
    let answersArrayHard = [];

    if (activeQuestion < 5) {
      this.setState({
        HelperAnswer:
          answersArrayEasy[Math.floor(Math.random() * answersArrayEasy.length)]
      });
    }
  };

  render() {
    return (
      <div
        className="phone-icon"
        onClick={() => {
          this.getHelpers();
          this.helperAnswer();
          this.stateToApp();
        }}
      />
    );
  }
}

export default Phone;
