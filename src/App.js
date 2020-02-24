import React, { Component } from "react";
import "./styles.css";
import { shuffle, Answers } from "./components/Answers";
import { Question } from "./components/Question";
import {
  Message,
  checkWinMessage,
  CheckLoseMessage
} from "./components/Message";
import { StartGameButton } from "./components/StartGameButton";
import LogoApp from "./components/LogoApp";
import { PyramidQuestions } from "./components/PyramidQuestions";
import { Help5050, firstAnswersToRemove5050 } from "./components/Helps/50-50";
import Phone from "./components/Helps/Phone";
import { PhoneMenu } from "./components/Helps/PhoneMenu";
import Public from "./components/Helps/Public";
import { AudienceGraph } from "./components/Helps/AudienceGraph";
import { ButtonDrawer } from "./components/buttonDrawer";

class App extends Component {
  constructor(props) {
    super(props);
    //this.state = initialQuestion();
    this.state = {
      drawerHidden: false,
      counterTime: 0,
      activeQuestion: 0,
      messagem: "",
      answers: [],
      question: "",
      correctAnswer: "",
      questionAnswered: false,
      answerClicked: "",
      selectedAnswer: "",
      isLoaded: false,
      questionAmmout: [
        "25€",
        "50€",
        "125€",
        "250€",
        "500€",
        "750€",
        "1 500€",
        "2 500€",
        "5 000€",
        "10 000€",
        "16 000€",
        "32 000€",
        "64 000€",
        "125 000€",
        "250 000 €"
      ],
      questionHidden: true,
      gameStart: false,
      messageHidden: true,
      startGameHidden: false,
      showingCorrectAnswer: false,
      activated5050: false,
      answersToRemove: [],
      help5050done: false,
      phoneHelpState: {},
      publicHelpState: {},
      publicHelpActivated: false
    };
  }

  handlePhone = state => {
    this.setState({
      phoneHelpState: state
    });
  };

  handlePublic = state => {
    this.setState({
      publicHelpState: state
    });
  };

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
            questionHidden: false,
            gameStart: true
          });
        });
    });
  };

  retrieveScores = () => {
    let currentScore = window.localStorage.getItem("scores");
    currentScore = JSON.parse(currentScore);
    let pontuacao = [this.state.activeQuestion];

    if(currentScore) {
      currentScore.push(pontuacao)
    } else {
      currentScore = pontuacao
    }
    window.localStorage.setItem("scores", JSON.stringify(currentScore));
  };

  checkVictory = input => {
    console.log(this.state.answers[input]);

    if (this.state.answers[input] === this.state.correctAnswer) {
      return true;
    } else {
      this.retrieveScores();
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
      showingCorrectAnswer: !this.state.showingCorrectAnswer,
      publicHelpActivated: false,
      questionAnswered: false
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

  helperClick = input => {
    console.log("Hey carregaste!");
    this.setState({
      phoneHelpState: {
        ...this.state.phoneHelpState,
        HelperChoose: input,
        HelperClicked: !this.state.phoneHelpState.HelperClicked
      }
    });
  };

  phoneHelperGone = () => {
    this.setState({
      phoneHelpState: { ...this.state.phoneHelpState, helperShow: false }
    });
  };

  publicClick = () => {
    this.setState({
      publicHelpActivated: !this.state.publicHelpActivated
    });
  };

  hideShowDrawer = () => {
    let currentDrawer = this.state.drawerHidden;

    this.setState({
      ...this.state,
      drawerHidden: !currentDrawer
    });
  };

  render() {
    return (
      <div className="App">
        <div
          className={`principal-screen ${
            this.state.drawerHidden === false
              ? "principal-screen-small"
              : "principal-screen-big"
          }`}
        >
          <ButtonDrawer
            hideShowDrawer={() => {
              this.hideShowDrawer();
            }}
          />
          <LogoApp state={this.state} />

          {/* <PublicGraph state={this.state} /> */}
          <AudienceGraph state={this.state} />

          <StartGameButton
            state={this.state}
            clickCallback={() => {
              this.getQuestionAndAnswers();
            }}
          />

          <div
            className={`question-screen ${
              this.state.phoneHelpState.helperShow
                ? "questions-hidden-helps"
                : this.state.questionHidden === false
                ? "questions-show"
                : "questions-hidden"
            }`}
          >
            <div
              className={`helps ${
                this.state.drawerHidden ? "helps-showing" : "helps-hidden"
              }`}
            >
              <Help5050
                state={this.state}
                activated5050={this.state.activated5050}
                click5050={() => {
                  this.click5050();
                }}
              />
              <Phone handlePhone={this.handlePhone} state={this.state} />
              <Public
                handlePublic={this.handlePublic}
                state={this.state}
                publicClick={() => {
                  this.publicClick();
                }}
              />
            </div>

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
          <PhoneMenu
            state={this.state}
            helperClick={index => {
              this.helperClick(index);
            }}
            phoneHelperGone={() => {
              this.phoneHelperGone();
            }}
          />
        </div>

        <div
          className={`drawer-screen ${
            this.state.drawerHidden === false
              ? "drawer-screen-showing"
              : "drawer-screen-hidden"
          }`}
        >
          <div id="image" />
          <div className="helps">
            <Help5050
              state={this.state}
              activated5050={this.state.activated5050}
              click5050={() => {
                this.click5050();
              }}
            />
            <Phone handlePhone={this.handlePhone} state={this.state} />
            <Public
              handlePublic={this.handlePublic}
              state={this.state}
              publicClick={() => {
                this.publicClick();
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
