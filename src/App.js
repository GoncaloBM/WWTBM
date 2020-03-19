import React, { Component } from "react";
import "./styles.css";
import { getQuestionsAndAnswersFromAPI } from "./components/functions/getQuestionsAndAnswers";
import {
  currentScoreBoard,
  whichQuestionLost
} from "./components/functions/scoreboard_functions/currentScoreBoard";
// you mix helper functions and components. Try to use
import { shuffle, Answers } from "./components/Answers";
import { Question } from "./components/Question";
import {
  Message,
  checkWinMessage,
  checkLoseMessage
} from "./components/Message";
import { StartGameButton } from "./components/StartGameButton";
import LogoApp from "./components/LogoApp";
// You're mixing default exports and named exports. Try to be consistent
import { PyramidQuestions } from "./components/PyramidQuestions";
import { Help5050, firstAnswersToRemove5050 } from "./components/helps/50-50";
import Phone from "./components/helps/Phone";
import { PhoneMenu } from "./components/helps/PhoneMenu";
import Public from "./components/helps/Public";
import { AudienceGraph } from "./components/helps/AudienceGraph";
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
      ScoreButtonHidden: false,
      showScoreBoard: false,
      scores: currentScoreBoard(),
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
    let url = getQuestionsAndAnswersFromAPI(this.state.activeQuestion);

    if (this.state.activeQuestion === 0 && this.state.isMobile) {
      this.setState({
        drawerHidden: false
      });
      // maybe you could move the drawerHidden directly to the setState below? And have its value equal to the negation of the condition of entry here?
    }

    this.setState(
      // if you can avoid using capitalized words in state, it'd be good. Just a stylistic change.
      { isLoaded: false, startGameHidden: true, ScoreButtonHidden: true },
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
      showScoreBoard: true
    });
    setTimeout(() => this.retrieveScores(), 1000);
  };

  showScoreBoard = () => {
    // this is more of a toggle than a show
    this.setState({
      showScoreBoard: !this.state.showScoreBoard
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

  checkVictory = input => {
    // pedantic. This is not a "victory" but checking if the answer is correct
    if (this.state.answers[input] === this.state.correctAnswer) {
      // You can simplify all this method by returning the expression in the if condition
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

    let messageToDisplayLose = checkLoseMessage(this.state); // you can change this method's capitalization

    /**
     * This whole setTimeout chain is very complex, with a whole lot of moving logic, asynchronous code and all.
     * Maybe you can simplify readibility by turning this function into an async function and using an helper method like
     * const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
     * With it you can write it like this:
     * doSomething()
     * await timeout(1000);
     * doSomethingElse();
     * await timeout(2000);
     * await doAnotherTing()
     */
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
      this.state.questionAmount[this.state.activeQuestion - 2]
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
    var classNames = require("classnames");
    // localStorage.clear();

    let principalScreen = classNames(
      "principal-screen",
      {
        "principal-screen-startGame": this.state.initialScreen,
        "principal-screen-game": !this.state.initialScreen
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
          />

          <LogoApp
            state={this.state}
            initialScreen={this.state.initialScreen}
            gameStart={this.state.gameStart}
            countToApp={this.counterFromChild}
          />

          <AudienceGraph
            publicHelpActivated={this.state.publicHelpActivated}
            publicHelpState={this.state.publicHelpState}
          />

          <ScoreBoard
            activeQuestion={this.state.activeQuestion}
            counterTime={this.state.counterTime}
            scoreState={this.state.scores}
            showScoreBoard={this.state.showScoreBoard}
          />

          <StartGameButton
            startGameHidden={this.state.startGameHidden}
            startGame={this.getQuestionAndAnswers}
          />

          <ScoreBoardButton
            showScoreBoard={this.showScoreBoard}
            ScoreButtonHidden={this.state.ScoreButtonHidden} // State with CamelCase
            showScoreBoardState={this.state.showScoreBoard}
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
                drawerHidden={this.state.drawerHidden}
                phoneHelpState={this.state.phoneHelpState}
                phoneHelpCallback={this.phoneHelpCallback}
                state={this.state} // Try to isolate this state into their own properties
              />
              <Public
                correctAnswer={this.state.correctAnswer}
                activeQuestion={this.state.activeQuestion}
                answers={this.state.answers}
                drawerHidden={this.state.drawerHidden}
                publickHelpCallback={this.publickHelpCallback} // public, not publick :P
                state={this.state} // Try to isolate the state
                publicClick={this.publicClick}
              />
            </div>

            <Question question={this.state.question} />

            <Answers
              key={this.state.activeQuestion}
              questionAnswered={this.state.questionAnswered}
              answers={this.state.answers}
              answerClicked={index => {
                // no need to create a new function here
                this.answerClicked(index);
              }}
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
            helperClick={index => {
              // no need for the new function here
              this.helperClick(index);
            }}
            phoneHelperGone={this.phoneHelperGone}
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
              drawerHidden={this.state.drawerHidden}
              phoneHelpState={this.state.phoneHelpState}
              phoneHelpCallback={this.phoneHelpCallback}
              state={this.state} // Try to isolate this state into their own properties
            />
            <Public
              correctAnswer={this.state.correctAnswer}
              activeQuestion={this.state.activeQuestion}
              answers={this.state.answers}
              drawerHidden={this.state.drawerHidden}
              publickHelpCallback={this.publickHelpCallback} // public, not publick :P
              state={this.state} // Try to isolate the state
              publicClick={this.publicClick}
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
