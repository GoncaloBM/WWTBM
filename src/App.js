import React, { Component } from "react";
import "./styles.css";
import { initialQuestion, shuffle, Question } from "./components/Question";
import decode from "./components/DecodingFunction";
import Button from "@material-ui/core/Button";
import { logo } from "./components/logo";

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
    this.setState({
      questionAnswered: true,
      selectedAnswer: this.state.answers[input]
    });
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
    return (
      <div className="principal-screen">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            this.getQuestionAndAnswers();
            this.setState({
              questionHidden: false
            });
          }}
        >
          Start Game
        </Button>
        {/* <logo /> */}
        <div>Question number: {this.state.activeQuestion}</div>
        <div
          id="question-screen"
          className={
            this.state.questionHidden ? "question-hidden" : "questions-show"
          }
        >
          <div id="question-line">
            {this.state.question ? <div className="arrow-left"></div> : ""}
            <div id="question">{decode(this.state.question)}</div>
            {this.state.question ? <div className="arrow-right"></div> : ""}
          </div>

          <Question
            state={this.state}
            questionAnswered={this.state.questionAnswered}
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

export default App;
