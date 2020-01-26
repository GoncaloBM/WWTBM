import React, { Component } from "react";
import "./styles.css";
import { initialQuestion, shuffle, Question } from "./components/Question";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialQuestion();
  }

  getQuestionAndAnswers = () => {
    this.setState({ isLoaded: false }, () => {
      fetch(
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple"
      )
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
            isLoaded: true
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

  getNextState = input => {
    let selectedAnswer = this.state.answers[input];
    console.log(selectedAnswer);
    let questionRight = this.checkVictory(input);
    if (questionRight) {
      this.getQuestionAndAnswers();
    } else {
      this.setState({
        messagem: "Perdeste!"
      });
    }
  };

  render() {
    if (this.state.question === null) {
      return null;
    } else {
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <button
            onClick={() => {
              this.getQuestionAndAnswers();
            }}
          >
            Clica aqui
          </button>
          <div>Question number: {this.state.activeQuestion}</div>
          <div id="question-screen">
            <div id="question">{this.state.question}</div>

            <Question
              answers={this.state.answers}
              clickCallback={index => {
                this.getNextState(index);
              }}
            />

            <div>Correct : {this.state.correctAnswer}</div>
          </div>
        </div>
      );
    }
  }
}

export default App;
