import React, { Component } from "react";
import "./styles.css";
import {
  initialQuestion,
  shuffle,
  Answers,
  checkMessage
} from "./components/Answers";
import { Question } from "./components/Question";
import { Message } from "./components/Message";
import { StartGameButton } from "./components/StartGameButton";
import { Logo } from "./components/logo";

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

    this.setState({ isLoaded: false, startGameHidden: true }, () => {
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

    setTimeout(
      () =>
        this.setState({
          showingCorrectAnswer: !this.state.showingCorrectAnswer
        }),
      2000
    );

    if (questionRight) {
      setTimeout(
        () =>
          this.setState({
            questionHidden: true,
            messageHidden: false,
            messagem: messageToDisplay
          }),
        4000
      );
      setTimeout(() => this.getNextState(), 7000);
    } else {
      setTimeout(() => {
        this.setState({
          questionHidden: true,
          messageHidden: false,
          messagem: "Perdeste!"
        });
      }, 4000);
    }
  };

  getNextState = () => {
    this.getQuestionAndAnswers();
    this.setState({
      messageHidden: true,
      showingCorrectAnswer: !this.state.showingCorrectAnswer
    });
  };

  render() {
    return (
      <div className="principal-screen">
        <Logo />

        <StartGameButton
          state={this.state}
          clickCallback={() => {
            this.getQuestionAndAnswers();
          }}
        />

        <div
          className={`question-screen ${
            this.state.questionHidden === false
              ? "questions-show"
              : "questions-hidden"
          }`}
        >
          <Question state={this.state} />

          <Answers
            state={this.state}
            questionAnswered={this.state.questionAnswered}
            answers={this.state.answers}
            clickCallback={index => {
              this.answerClicked(index);
            }}
            checkRightAnswer={() => {
              this.checkRightAnswer();
            }}
          />

          <div>Correct : {this.state.correctAnswer}</div>
        </div>
        <Message state={this.state} />
      </div>
    );
  }
}

export default App;
