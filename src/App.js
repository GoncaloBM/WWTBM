import React, { Component } from "react";
import "./styles.css";
import {
  initialQuestion,
  shuffle,
  Question,
  checkMessage
} from "./components/Question";
import decode from "./components/DecodingFunction";
import Button from "@material-ui/core/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialQuestion();
  }

  getQuestionAndAnswers = () => {
    let url = "";

    if (this.state.activeQuestion < 5) {
      url =
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";
    } else if (
      this.state.activeQuestion > 4 &&
      this.state.activeQuestion < 10
    ) {
      url =
        "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";
    } else if (this.state.activeQuestion > 9) {
      url =
        "https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple";
    }

    this.setState({ isLoaded: false }, () => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          let answersArray = [];
          answersArray.push(data.results[0].correct_answer);
          answersArray.push(data.results[0].incorrect_answers[0]);
          answersArray.push(data.results[0].incorrect_answers[1]);
          answersArray.push(data.results[0].incorrect_answers[2]);

          let randomAnswers = shuffle(answersArray);

          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            question: data.results[0].question,
            correctAnswer: data.results[0].correct_answer,
            answers: randomAnswers,
            isLoaded: true,
            questionHidden: false
          });
        });
    });
  };

  checkVictory = input => {
    console.log(this.state.answers[input]);

    if (this.state.answers[input] === this.state.correctAnswer) {
      return true;
    } else {
      return false;
    }
  };

  answerClicked = input => {
    this.setState({
      questionAnswered: true,
      selectedAnswer: this.state.answers[input]
    });

    let selectedAnswer = this.state.answers[input];
    console.log(selectedAnswer);
    let questionRight = this.checkVictory(input);

    let messageToDisplay = checkMessage(this.state);

    if (questionRight) {
      this.setState({
        questionHidden: true,
        messageHidden: false,
        messagem: messageToDisplay
      });
      setTimeout(() => this.getNextState(), 3000);
    } else {
      this.setState({
        questionHidden: true,
        messageHidden: false,
        messagem: "Perdeste!"
      });
    }
  };

  getNextState = () => {
    this.getQuestionAndAnswers();
    this.setState({
      messageHidden: true
    });
  };

  render() {
    return (
      <div className="principal-screen">
        <div
          id="start-line" className= {this.state.startGameHidden ? 'start-hidden' : 'start-show'}
          onClick={() => {
            this.getQuestionAndAnswers();
          }}
        >
          <div className="arrow-left-start"></div>
          <div className="start-game-button">Start Game</div>
          <div className="arrow-right-start"></div>
        </div>
        {/* <logo /> */}
        <div
          className={`question-screen ${
            this.state.questionHidden === false
              ? "questions-show"
              : "questions-hidden"
          }`}
        >
          <div>Question number: {this.state.activeQuestion}</div>
          <div id="question-line">
            {this.state.question ? <div className="arrow-left" /> : ""}
            <div id="question">{decode(this.state.question)}</div>
            {this.state.question ? <div className="arrow-right" /> : ""}
          </div>

          <Question
            state={this.state}
            questionAnswered={this.state.questionAnswered}
            answers={this.state.answers}
            clickCallback={index => {
              this.answerClicked(index);
            }}
          />

          <div>Correct : {this.state.correctAnswer}</div>
        </div>
        <div
          className={`message-screen
            ${this.state.messageHidden ? "hidden-message" : "show-message"}
          `}
        >
          {this.state.messagem}
        </div>
      </div>
    );
  }
}

export default App;
