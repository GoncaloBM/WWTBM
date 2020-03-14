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
import GiveUpButton from "./components/GiveUpButton";
import GiveUpMessage from "./components/GiveUpMessage";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoardButton } from "./components/ScoreBoardButton";
import ScoreBoard from "./components/ScoreBoard";
import LoosingName from "./components/LoosingName";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      isMobile: this.isMobile(),
      initialScreen: true,
      drawerHidden: true,
      counterTime: 0,
      name: "",
      finalCount: 0,
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
      publicHelpActivated: false,
      giveUpPrompted: false,
      endGame: false,
      resetGameHidden: true,
      ScoreButtonHidden: false,
      showScoreBoard: false,
      scores: this.currentScoreBoard(),
      loosingNameInputHidden: true,
      counter0: 0,
      lost: false
    };
  };

  isMobile = () => {
    return window.innerWidth > 450 ? true : false;
  };

  phoneHelpCallback = state => {
    this.setState({
      phoneHelpState: state
    });
  };

  publickHelpCallback = state => {
    this.setState({
      publicHelpState: state
    });
  };

  publicClick = () => {
    this.setState({
      publicHelpActivated: !this.state.publicHelpActivated
    });
  };

  giveUpClick = () => {
    this.setState({
      giveUpPrompted: !this.state.giveUpPrompted
    });
  };

  getQuestionAndAnswers = () => {
    let url = "";

    if (this.state.activeQuestion === 0 && this.state.isMobile) {
      this.setState({
        ...this.state,
        drawerHidden: false
      });
    }

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

    this.setState(
      { isLoaded: false, startGameHidden: true, ScoreButtonHidden: true },
      () => {
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
              gameStart: true,
              initialScreen: false
            });
          });
      }
    );
  };

  counterFromChild = count => {
    this.setState({
      ...this.state,
      counterTime: count
    });
  };

  submitLoosingName = loosingName => {
    this.setState({
      ...this.state,
      name: loosingName,
      resetGameHidden: false,
      loosingNameInputHidden: true,
      showScoreBoard: true
    });
    setTimeout(() => this.retrieveScores(), 1000);
  };

  showScoreBoard = () => {
    this.setState({
      ...this.state,
      showScoreBoard: !this.state.showScoreBoard
    });
  };

  currentScoreBoard = () => {
    let currentScore = window.localStorage.getItem("scores");
    currentScore = JSON.parse(currentScore);

    return currentScore;
  };

  retrieveScores = () => {
    let currentScore = window.localStorage.getItem("scores");
    currentScore = JSON.parse(currentScore);
    let pontuacao = {
      name: this.state.name,
      question: !this.state.lost
        ? this.state.activeQuestion
        : this.state.activeQuestion < 5
        ? 0
        : this.state.activeQuestion > 4 && this.state.activeQuestion < 10
        ? 5
        : this.state.activeQuestion > 9
        ? 10
        : "",
      time: this.state.counterTime
    };

    if (currentScore) {
      currentScore.push(pontuacao);

      currentScore.sort(function(a, b) {
        return b.question - a.question || b.time - a.time;
      });
    } else {
      currentScore = [pontuacao];
    }

    this.setState({
      ...this.state,
      scores: currentScore
    });

    window.localStorage.setItem("scores", JSON.stringify(currentScore));
  };

  checkVictory = input => {
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
        this.setState(
          {
            questionHidden: true,
            messageHidden: false,
            messagem: messageToDisplayLose,
            loosingNameInputHidden: false,
            finalCount: this.state.counterTime,
            lost: true
          },
          () => {
            this.setState({ endGame: true });
          }
        );
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
  };

  helperClick = input => {
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

  hideShowDrawer = () => {
    let currentDrawer = this.state.drawerHidden;

    this.setState({
      ...this.state,
      drawerHidden: !currentDrawer
    });
  };

  giveUp = () => {
    let winAmmount = `${
      this.state.questionAmmout[this.state.activeQuestion - 2]
    }€`;

    this.setState({
      ...this.state,
      finalCount: this.state.counterTime,
      giveUpPrompted: !this.state.giveUpPrompted,
      endGame: true,
      messageHidden: false,
      message: winAmmount,
      loosingNameInputHidden: false
    });
  };

  resetGame = () => {
    this.setState(this.initialState());
  };

  render() {
    // localStorage.clear();
    return (
      <div className="App">
        <div
          className={`principal-screen ${
            this.state.initialScreen
              ? "principal-screen-startGame"
              : "principal-screen-game"
          } ${
            this.state.drawerHidden === false
              ? "principal-screen-small"
              : "principal-screen-big"
          }`}
        >
          <ButtonDrawer
            startGame={this.state.gameStart}
            drawerHidden={this.state.drawerHidden}
            hideShowDrawer={() => {
              this.hideShowDrawer();
            }}
          />

          <LogoApp state={this.state} countToApp={this.counterFromChild} />

          <AudienceGraph state={this.state} />
          
          <ScoreBoard
            activeQuestion={this.state.activeQuestion}
            counterTime={this.state.counterTime}
            scoreState={this.state.scores}
            showScoreBoard={this.state.showScoreBoard}
          />

          <StartGameButton
            state={this.state}
            clickCallback={() => {
              this.getQuestionAndAnswers();
            }}
          />

          <ScoreBoardButton
            showScoreBoard={() => this.showScoreBoard()}
            ScoreButtonHidden={this.state.ScoreButtonHidden}
            showScoreBoardState={this.state.showScoreBoard}
          />

          <div
            className={`question-screen ${
              this.state.phoneHelpState.helperShow ||
              this.state.giveUpPrompted ||
              this.state.endGame
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
              style={{ height: this.state.drawerHidden ? "5rem" : "" }}
            >
              <Help5050
                state={this.state}
                activated5050={this.state.activated5050}
                click5050={() => {
                  this.click5050();
                }}
              />
              <Phone
                phoneHelpCallback={this.phoneHelpCallback}
                state={this.state}
              />
              <Public
                publickHelpCallback={this.publickHelpCallback}
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
              answerClicked={index => {
                this.answerClicked(index);
              }}
              checkRightAnswer={() => {
                this.checkRightAnswer();
              }}
            />

            <div>Correct : {this.state.correctAnswer}</div>
          </div>

          <GiveUpMessage
            state={this.state}
            giveUp={() => {
              this.giveUp();
            }}
            giveUpClick={() => {
              this.giveUpClick();
            }}
          />

          <ResetButton state={this.state} resetGame={() => this.resetGame()} />

          <Message state={this.state} />

          <LoosingName
            endGame={this.state.endGame}
            submitLoosingName={this.submitLoosingName}
            loosingNameInputHidden={this.state.loosingNameInputHidden}
          />
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
            <Phone
              phoneHelpCallback={this.phoneHelpCallback}
              state={this.state}
            />
            <Public
              publickHelpCallback={this.publickHelpCallback}
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
          <GiveUpButton
            giveUpClick={() => {
              this.giveUpClick();
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
