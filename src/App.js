import React, { Component } from "react";
import "./styles.css";
// you mix helper functions and components. Try to use 
import { shuffle, Answers } from "./components/Answers";
import { Question } from "./components/Question";
import {
  Message,
  checkWinMessage,
  CheckLoseMessage
} from "./components/Message";
import { StartGameButton } from "./components/StartGameButton";
import LogoApp from "./components/LogoApp";
// You're mixing default exports and named exports. Try to be consistent
import { PyramidQuestions } from "./components/PyramidQuestions";
import { Help5050, firstAnswersToRemove5050 } from "./components/Helps/50-50";
// When naming your folders, try to always use lower-case. This is less error-prone and more compatible (some OS's )
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
      questionAmmout: [ // typo: amount
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
        // No need to set the same state again. If you change drawerHidden only, you get the same results
        ...this.state,
        drawerHidden: false
      });
      // maybe you could move the drawerHidden directly to the setState below? And have its value equal to the negation of the condition of entry here?
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
    // this block of code could live in a pure function.

    this.setState(
      // if you can avoid using capitalized words in state, it'd be good. Just a stylistic change.
      { isLoaded: false, startGameHidden: true, ScoreButtonHidden: true },
      () => {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let answersArray = []; // You don't change the reference. This can be a const.
            answersArray.push(data.results[0].correct_answer);
            answersArray.push(data.results[0].incorrect_answers[0]);
            answersArray.push(data.results[0].incorrect_answers[1]);
            answersArray.push(data.results[0].incorrect_answers[2]);
            // You can define this directly in the literal eg: [data.results[0].correct_answer, ...data.results[0].incorrect_answers]

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
      ...this.state, // this line is not necessary
      counterTime: count
    });
  };

  submitLoosingName = loosingName => { // losing name, not loosing :P
    this.setState({
      ...this.state, // this line is not necessary
      name: loosingName,
      resetGameHidden: false,
      loosingNameInputHidden: true,
      showScoreBoard: true
    });
    setTimeout(() => this.retrieveScores(), 1000);
  };

  showScoreBoard = () => { // this is more of a toggle than a show
    this.setState({
      ...this.state, // this line is not necessary
      showScoreBoard: !this.state.showScoreBoard
    });
  };

  currentScoreBoard = () => { // this seems like a pure function. You can move it out of the class and/or the file if you want
    let currentScore = window.localStorage.getItem("scores");
    currentScore = JSON.parse(currentScore);

    return currentScore;
  };

  retrieveScores = () => {
    let currentScore = window.localStorage.getItem("scores");
    currentScore = JSON.parse(currentScore);
    // the two above lines are repeated code
    let pontuacao = { // portuguese? :P
      name: this.state.name,
      // The line below is very hard to read. Move this to a function (receives the loss state and the active question and returns the next one?)
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
        return b.question - a.question || a.time - b.time;
      });
    } else {
      currentScore = [pontuacao];
    }

    this.setState({
      ...this.state, // this is not needed
      scores: currentScore
    });

    window.localStorage.setItem("scores", JSON.stringify(currentScore));
  };

  checkVictory = input => { // pedantic. This is not a "victory" but checking if the answer is correct
    if (this.state.answers[input] === this.state.correctAnswer) { // You can simplify all this method by returning the expression in the if condition
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

    let messageToDisplayLose = CheckLoseMessage(this.state); // you can change this method's capitalization

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
          // If you do a lot of conditional classes, consider using a dependency like classnames: https://www.npmjs.com/package/classnames
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
            hideShowDrawer={() => { // no need to create a new function here. Just pass the reference to it.
              this.hideShowDrawer();
            }}
          />
          {
            /**
             * Instead of passing the whole state down the components, try to pass only what the components need, as individual props
             * That will allow you to re-render only when what you need changes and better identify the dependencies of each component
             */
          }
          <LogoApp state={this.state} countToApp={this.counterFromChild} />

          {
            /**
             * Instead of passing the whole state down the components, try to pass only what the components need, as individual props
             * That will allow you to re-render only when what you need changes and better identify the dependencies of each component
             */
          }
          <AudienceGraph state={this.state} />
          
          {
            // This is a much better example
          }
          <ScoreBoard
            activeQuestion={this.state.activeQuestion}
            counterTime={this.state.counterTime}
            scoreState={this.state.scores}
            showScoreBoard={this.state.showScoreBoard}
          />

          {
            /**
             * Instead of passing the whole state down the components, try to pass only what the components need, as individual props
             * That will allow you to re-render only when what you need changes and better identify the dependencies of each component
             */
          }
          <StartGameButton
            state={this.state}
            clickCallback={() => { // you can pass the callbackDirectly here
              this.getQuestionAndAnswers();
            }}
          />

          <ScoreBoardButton
            showScoreBoard={() => this.showScoreBoard()} // You can pass the reference to the method here, no need to create a new function
            ScoreButtonHidden={this.state.ScoreButtonHidden} // State with CamelCase
            showScoreBoardState={this.state.showScoreBoard}
          />

            {
              // Maybe use classNames here.
            }
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
              style={{ height: this.state.drawerHidden ? "5rem" : "" }} // Maybe you can do the 5rem height in the respective class instead.
            >
              <Help5050
                state={this.state} // Try to isolate this state into their own properties
                activated5050={this.state.activated5050}
                click5050={() => { // Since we don't change anything, no need to create a new function here.
                  this.click5050();
                }}
              />
              <Phone
                phoneHelpCallback={this.phoneHelpCallback}
                state={this.state} // Try to isolate this state into their own properties 
              />
              <Public
                publickHelpCallback={this.publickHelpCallback} // public, not publick :P 
                state={this.state} // Try to isolate the state
                publicClick={() => { // No ned to create a new function here
                  this.publicClick();
                }}
              />
            </div>
            { 
              // Try to isolate the props here.
            }
            <Question state={this.state} />

            <Answers
              key={this.state.activeQuestion}
              state={this.state} // Try not to depend on the state. You've already drilled down a few of the props.
              questionAnswered={this.state.questionAnswered}
              answers={this.state.answers}
              answerClicked={index => { // no need to create a new function here
                this.answerClicked(index);
              }}
              checkRightAnswer={() => { // same as above
                this.checkRightAnswer();
              }}
            />

            <div>Correct : {this.state.correctAnswer}</div>
          </div>

          <GiveUpMessage
            state={this.state} // try to isolate the state
            giveUp={() => { // no need to create a new function here
              this.giveUp();
            }}
            giveUpClick={() => {
              this.giveUpClick();
            }}
          />
          {
            // Try to isolate the state and no need to create a new function here
          }
          <ResetButton state={this.state} resetGame={() => this.resetGame()} />

          {
            // Try to isolate the state and pass down to individual props
          }
          <Message state={this.state} />

          <LoosingName
            endGame={this.state.endGame}
            submitLoosingName={this.submitLoosingName}
            loosingNameInputHidden={this.state.loosingNameInputHidden}
          />
          <PhoneMenu
            state={this.state}
            helperClick={index => { // no need for the new function here
              this.helperClick(index);
            }}
            phoneHelperGone={() => {
              this.phoneHelperGone();
            }}
          />
        </div>

            {
              // classnames helps!
            }
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
              state={this.state} // Drill this down! :P 
              activated5050={this.state.activated5050}
              click5050={() => { // no need for a new function here
                this.click5050();
              }}
            />
            <Phone
              phoneHelpCallback={this.phoneHelpCallback}
              state={this.state} // Drill this down! :P 
            />
            <Public
              publickHelpCallback={this.publickHelpCallback}
              state={this.state} // Drill this down! :P 
              publicClick={() => { // No need for the new function created during the render
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
            giveUpClick={() => { // no need for the new function here.
              this.giveUpClick();
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
