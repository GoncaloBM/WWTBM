import React, { Component } from "react";
import "./styles.css";
import { initialQuestion, shuffle, Answers } from "./components/Answers";
import { Question } from "./components/Question";
import {
  Message,
  checkWinMessage,
  CheckLoseMessage
} from "./components/Message";
import { StartGameButton } from "./components/StartGameButton";
import { Logo } from "./components/logo";
import { PyramidQuestions } from "./components/PyramidQuestions";
import { Help5050, firstAnswersToRemove5050 } from "./components/Helps/50-50";

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

    let messageToDisplayWin = checkWinMessage(this.state);

    let messageToDisplayLose = CheckLoseMessage(this.state);

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
            messagem: messageToDisplayWin
          }),
        4000
      );
      setTimeout(() => this.getNextState(), 7000);
    } else {
      setTimeout(() => {
        this.setState({
          questionHidden: true,
          messageHidden: false,
          messagem: messageToDisplayLose
        });
      }, 4000);
    }
  };

  getNextState = () => {
    this.getQuestionAndAnswers();
    this.setState({
      activated5050: false,
      messageHidden: true,
      showingCorrectAnswer: !this.state.showingCorrectAnswer
    });
  };

  click5050 = () => {
    this.setState({
      activated5050: true,
      answersToRemove: firstAnswersToRemove5050(this.state),
      help5050done: true
    });
    console.log(this.state.answersToRemove);
  };

  render() {
    return (
      <div className="App">
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
              key={this.state.activeQuestion}
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

        <div className="drawer-screen">
          <div id="image"></div>
          <div id="helps">
            <Help5050
              state={this.state}
              activated5050={this.state.activated5050}
              click5050={() => {
                this.click5050();
              }}
            />
          </div>
          <div id="question-pyramid">
            <PyramidQuestions
              questionAmmount={this.state.questionAmmout}
              activeQuestion={this.state.activeQuestion}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
