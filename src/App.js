import React, { Component } from "react";
import { createContext } from "react";
import "./styles.css";
import ScoreBoard from "./components/ScoreBoard";
import LoosingName from "./components/LoosingName";
import Public from "./components/Helps/Public";
import Phone from "./components/Helps/Phone";
import LogoApp from "./components/LogoApp";
import { getQuestionsAndAnswersFromAPI } from "./components/functions/getQuestionsAndAnswers";
import {
  currentScoreBoard,
  whichQuestionLost
} from "./components/functions/scoreboard_functions/currentScoreBoard";
import { shuffle, Answers } from "./components/Answers";
import { Question } from "./components/Question";
import {
  Message,
  checkWinMessage,
  checkLoseMessage
} from "./components/Message";
import { StartGameButton } from "./components/StartGameButton";
import { PyramidQuestions } from "./components/PyramidQuestions";
import { Help5050, firstAnswersToRemove5050 } from "./components/Helps/50-50";
import { PhoneMenu } from "./components/Helps/PhoneMenu";
import { AudienceGraph } from "./components/Helps/AudienceGraph";
import { ButtonDrawer } from "./components/buttonDrawer";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoardButton } from "./components/ScoreBoardButton";
import { GiveUpButton } from "./components/GiveUpButton";
import { GiveUpMessage } from "./components/GiveUpMessage";
import { AboutMe } from "./components/AboutMe";

export const LogoContext = createContext(null);

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
      questionAmount: [
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
      scoreButtonHidden: false,
      toggleScoreBoard: false,
      scores: currentScoreBoard(),
      loosingNameInputHidden: true,
      counter0: 0,
      lost: false,
      aboutMeToggle: false,
      win: false
    };
  };

  isMobile = () => {
    return window.innerWidth > 450 ? false : true;
  };

  phoneHelpCallback = state => {
    this.setState({
      phoneHelpState: state
    });
  };

  publicHelpCallback = state => {
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
    let url = getQuestionsAndAnswersFromAPI(this.state.activeQuestion);
    let drawerHidden;

    if (this.state.activeQuestion === 0) {
      drawerHidden = this.state.isMobile && true;
    } else {
      drawerHidden = this.state.isMobile ? true : false;
    }

    this.setState(
      {
        isLoaded: false,
        startGameHidden: true,
        scoreButtonHidden: true,
        drawerHidden: drawerHidden,
        toggleScoreBoard: false
      },
      () => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const answersArray = [
              data.results[0].correct_answer,
              ...data.results[0].incorrect_answers
            ];

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
      counterTime: count
    });
  };

  submitLoosingName = losingName => {
    this.setState({
      name: losingName,
      resetGameHidden: false,
      loosingNameInputHidden: true,
      toggleScoreBoard: true
    });
    setTimeout(() => this.retrieveScores(), 1000);
  };

  toggleScoreBoard = () => {
    this.setState({
      toggleScoreBoard: !this.state.toggleScoreBoard
    });
  };

  retrieveScores = () => {
    let currentScore = currentScoreBoard();
    let pontuation = {
      name: this.state.name,
      question: whichQuestionLost(this.state.lost, this.state.activeQuestion),
      time: this.state.counterTime
    };

    if (currentScore) {
      currentScore.push(pontuation);

      currentScore.sort(function(a, b) {
        return b.question - a.question || a.time - b.time;
      });
    } else {
      currentScore = [pontuation];
    }

    this.setState({
      scores: currentScore
    });

    window.localStorage.setItem("scores", JSON.stringify(currentScore));
  };

  checkAnswer = input => {
    return this.state.answers[input] === this.state.correctAnswer
      ? true
      : false;
  };

  answerClicked = async input => {
    let questionRight = this.checkAnswer(input);

    let messageToDisplayWin = checkWinMessage(this.state);

    let messageToDisplayLose = checkLoseMessage(this.state);

    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    this.setState({
      questionAnswered: true,
      selectedAnswer: this.state.answers[input]
    });
    await timeout(2000);
    this.setState({
      showingCorrectAnswer: !this.state.showingCorrectAnswer
    });
    await timeout(2000);
    if (questionRight) {
      this.setState({
        questionHidden: true,
        messageHidden: false,
        messagem: messageToDisplayWin
      });
      await timeout(3000);
      this.getNextState();
    } else {
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
    }
  };

  getNextState = () => {
    if (this.state.activeQuestion > 14) {
      this.setState(
        {
          ...this.state,
          win: true,
          drawerHidden: true
        },
        () => {
          this.giveUp();
        }
      );
    } else {
      this.getQuestionAndAnswers();
      this.setState({
        activated5050: false,
        messageHidden: true,
        showingCorrectAnswer: !this.state.showingCorrectAnswer,
        publicHelpActivated: false,
        questionAnswered: false
      });
    }
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
    let winAmount = `${
      this.state.questionAmount[this.state.activeQuestion - 2]
    }€`;

    this.setState({
      ...this.state,
      finalCount: this.state.counterTime,
      giveUpPrompted: false,
      endGame: true,
      messageHidden: false,
      message: winAmount,
      loosingNameInputHidden: false
    });
  };

  resetGame = () => {
    this.setState(this.initialState());
  };

  showAbout = () => {
    this.setState({
      aboutMeToggle: !this.state.aboutMeToggle,
      startGameHidden: !this.state.startGameHidden,
      scoreButtonHidden: !this.state.scoreButtonHidden
    });
  };

  render() {
    var classNames = require("classnames");
    // localStorage.clear();

    let principalScreen = classNames(
      "principal-screen",
      {
        "principal-screen-startGame": this.state.initialScreen,
        "principal-screen-game": !this.state.initialScreen,
        "win-game": !this.state.initialScreen && this.state.win
      },
      {
        "principal-screen-big": this.state.drawerHidden,
        "principal-screen-small": !this.state.drawerHidden
      }
    );

    let drawerScreen = classNames(
      "drawer-screen",
      { "drawer-screen-showing": !this.state.drawerHidden },
      { "drawer-screen-hidden": this.state.drawerHidden }
    );

    let helps = classNames(
      "helps",
      { "helps-showing": this.state.drawerHidden },
      { "helps-hidden": !this.state.drawerHidden }
    );

    let questionScreen = classNames(
      "question-screen",
      {
        "questions-hidden-helps":
          this.state.phoneHelpState.helperShow ||
          this.state.giveUpPrompted ||
          this.state.endGame
      },
      { "questions-hidden": this.state.questionHidden },
      { "questions-show": !this.state.questionHidden }
    );

    return (
      <div className="App">
        <div className={principalScreen}>
          <ButtonDrawer
            startGame={this.state.gameStart}
            drawerHidden={this.state.drawerHidden}
            hideShowDrawer={this.hideShowDrawer}
            win={this.state.win}
          />

          <LogoContext.Provider value={this.state}>
            <LogoApp
              state={this.state}
              initialScreen={this.state.initialScreen}
              gameStart={this.state.gameStart}
              countToApp={this.counterFromChild}
            />
          </LogoContext.Provider>

          <AudienceGraph
            publicHelpActivated={this.state.publicHelpActivated}
            publicHelpState={this.state.publicHelpState}
          />

          <ScoreBoard
            activeQuestion={this.state.activeQuestion}
            counterTime={this.state.counterTime}
            scoreState={this.state.scores}
            toggleScoreBoard={this.state.toggleScoreBoard}
          />

          <StartGameButton
            startGameHidden={this.state.startGameHidden}
            startGame={this.getQuestionAndAnswers}
            aboutMeToggle={this.state.aboutMeToggle}
          />

          <ScoreBoardButton
            toggleScoreBoard={this.toggleScoreBoard}
            scoreButtonHidden={this.state.scoreButtonHidden}
            toggleScoreBoardState={this.state.toggleScoreBoard}
            aboutMeToggle={this.state.aboutMeToggle}
          />

          <div className={questionScreen}>
            <div className={helps}>
              <Help5050
                help5050done={this.state.help5050done}
                drawerHidden={this.state.drawerHidden}
                activated5050={this.state.activated5050}
                click5050={this.click5050}
              />
              <Phone
                activeQuestion={this.state.activeQuestion}
                correctAnswer={this.state.correctAnswer}
                answers={this.state.answers}
                drawerHidden={this.state.drawerHidden}
                phoneHelpState={this.state.phoneHelpState}
                phoneHelpCallback={this.phoneHelpCallback}
                help5050done={this.state.help5050done}
                answersToRemove={this.state.answersToRemove}
              />

              <Public
                correctAnswer={this.state.correctAnswer}
                activeQuestion={this.state.activeQuestion}
                answers={this.state.answers}
                drawerHidden={this.state.drawerHidden}
                publicHelpCallback={this.publicHelpCallback}
                publicClick={this.publicClick}
                publicHelpState={this.state.publicHelpState}
                help5050done={this.state.help5050done}
                answersToRemove={this.state.answersToRemove}
              />
            </div>

            <Question question={this.state.question} />

            <Answers
              isMobile={this.state.isMobile}
              key={this.state.activeQuestion}
              questionAnswered={this.state.questionAnswered}
              answers={this.state.answers}
              answerClicked={this.answerClicked}
              checkRightAnswer={this.checkRightAnswer}
              isMobile={this.state.isMobile}
              answersToRemove={this.state.answersToRemove}
              correctAnswer={this.state.correctAnswer}
              selectedAnswer={this.state.selectedAnswer}
              showingCorrectAnswer={this.state.showingCorrectAnswer}
              activated5050={this.state.activated5050}
            />

            <div>Correct : {this.state.correctAnswer}</div>
          </div>

          <GiveUpMessage
            giveUp={this.giveUp}
            giveUpClick={this.giveUpClick}
            giveUpPrompted={this.state.giveUpPrompted}
          />

          <ResetButton
            resetGameHidden={this.state.resetGameHidden}
            resetGame={this.resetGame}
          />

          <Message
            messageHidden={this.state.messageHidden}
            messagem={this.state.messagem}
          />

          <LoosingName
            endGame={this.state.endGame}
            submitLoosingName={this.submitLoosingName}
            loosingNameInputHidden={this.state.loosingNameInputHidden}
          />
          <PhoneMenu
            state={this.state}
            phoneHelpState={this.state.phoneHelpState}
            helperClick={this.helperClick}
            phoneHelperGone={this.phoneHelperGone}
          />

          <AboutMe
            aboutMeToggle={this.state.aboutMeToggle}
            gameStart={this.state.gameStart}
            clickAbout={this.showAbout}
          />
        </div>

        <div className={drawerScreen}>
          <div id="image" />

          <div className="helps">
            <Help5050
              help5050done={this.state.help5050done}
              drawerHidden={this.state.drawerHidden}
              activated5050={this.state.activated5050}
              click5050={this.click5050}
            />

            <Phone
              activeQuestion={this.state.activeQuestion}
              correctAnswer={this.state.correctAnswer}
              answers={this.state.answers}
              drawerHidden={this.state.drawerHidden}
              phoneHelpState={this.state.phoneHelpState}
              phoneHelpCallback={this.phoneHelpCallback}
              help5050done={this.state.help5050done}
              answersToRemove={this.state.answersToRemove}
            />
            <Public
              correctAnswer={this.state.correctAnswer}
              activeQuestion={this.state.activeQuestion}
              answers={this.state.answers}
              drawerHidden={this.state.drawerHidden}
              publicHelpCallback={this.publicHelpCallback}
              publicClick={this.publicClick}
              publicHelpState={this.state.publicHelpState}
              help5050done={this.state.help5050done}
              answersToRemove={this.state.answersToRemove}
            />
          </div>

          <div id="question-pyramid">
            <PyramidQuestions
              questionAmount={this.state.questionAmount}
              activeQuestion={this.state.activeQuestion}
            />
          </div>
          <GiveUpButton giveUpClick={this.giveUpClick} />
        </div>
      </div>
    );
  }
}

export default App;
