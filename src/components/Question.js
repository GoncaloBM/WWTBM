import React, { Component } from "react";
import decoding from "./DecodingFunction";
import "./Question.css";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      answers: [],
      answered1: false,
      answered2: false,
      answered3: false,
      answered4: false,
      correct1: false,
      correct2: false,
      correct3: false,
      correct4: false,
      correct: false,
      amount_corrected: 0
    };
  }

  getQuestion = () => {
    this.setState({ isLoaded: false }, () => {
      fetch(
        "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple"
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            question: data.results[0],
            isLoaded: true
          });
          this.getAnswers();
        });
    });
  };

  getAnswers = () => {
    let answersArr = [];
    answersArr.push(this.state.question.correct_answer);
    answersArr.push(this.state.question.incorrect_answers[0]);
    answersArr.push(this.state.question.incorrect_answers[1]);
    answersArr.push(this.state.question.incorrect_answers[2]);

    let randomArr = this.shuffle(answersArr);

    console.log(randomArr);
    this.setState({
      answers: [randomArr[0], randomArr[1], randomArr[2], randomArr[3]]
    });
  };

  shuffle = arr => {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  toggleAnswered = index => {
    if (index === 0) {
      let currentState1 = this.state.answered1;
      this.setState({ answered1: !currentState1 });
    } else if (index === 1) {
      let currentState2 = this.state.answered2;
      this.setState({ answered2: !currentState2 });
    } else if (index === 2) {
      let currentState3 = this.state.answered3;
      this.setState({ answered3: !currentState3 });
    } else if (index === 3) {
      let currentState4 = this.state.answered4;
      this.setState({ answered4: !currentState4 });
    }

    for (let i = 0; i < 4; i++) {
      this.checkCorrectAnswer(i);
    }
  };

  checkCorrectAnswer = index => {
    if (index === 0) {
      if (this.state.answers[index] === this.state.question.correct_answer) {
        this.setState({ correct1: !this.state.correct1 });
      }
    } else if (index === 1) {
      if (this.state.answers[index] === this.state.question.correct_answer) {
        this.setState({ correct2: !this.state.correct2 });
      }
    } else if (index === 2) {
      if (this.state.answers[index] === this.state.question.correct_answer) {
        this.setState({ correct3: !this.state.correct3 });
      }
    } else if (index === 3) {
      if (this.state.answers[index] === this.state.question.correct_answer) {
        this.setState({ correct4: !this.state.correct4 });
      }
    }
  };

  onClickAnswer1 = () => {
    this.resetStates();
    this.getQuestion();
    if (this.state.answers[0] === this.state.question.correct_answer) {
      this.setState(prevState => {
        return { amount_corrected: prevState.amount_corrected + 1 };
      });
    }
  };

  onClickAnswer2 = () => {
    this.resetStates();
    this.getQuestion();
    if (this.state.answers[1] === this.state.question.correct_answer) {
      this.setState(prevState => {
        return { amount_corrected: prevState.amount_corrected + 1 };
      });
    }
  };

  onClickAnswer3 = () => {
    this.resetStates();
    this.getQuestion();
    if (this.state.answers[2] === this.state.question.correct_answer) {
      this.setState(prevState => {
        return { amount_corrected: prevState.amount_corrected + 1 };
      });
    }
  };

  onClickAnswer4 = () => {
    this.resetStates();
    this.getQuestion();
    if (this.state.answers[3] === this.state.question.correct_answer) {
      this.setState(prevState => {
        return { amount_corrected: prevState.amount_corrected + 1 };
      });
    }
  };

  resetStates = () => {
    this.setState({
      answered1: false,
      answered2: false,
      answered3: false,
      answered4: false,
      correct1: false,
      correct2: false,
      correct3: false,
      correct4: false
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.getQuestion();
          }}
        >
          Generate Question
        </button>
        {this.state.isLoaded ? (
          <div className="screen-question">
            <div className="full-question">
              <div className="arrow-left" />
              <div className="question">
                {decoding(this.state.question.question)}
              </div>
              <div className="arrow-right" />
            </div>

            <div className="answers">
              <div
                className="full-answer"
                onClick={() => {
                  this.toggleAnswered(0);
                  setTimeout(this.onClickAnswer1, 3000);
                }}
              >
                <div className="arrow-left" />
                <div
                  className={
                    this.state.correct1
                      ? "correct"
                      : `${this.state.answered1 ? "answered" : "answer"}`
                  }
                >
                  {decoding(this.state.answers[0])}
                </div>
                <div className="arrow-right" />
              </div>

              <div
                className="full-answer"
                onClick={() => {
                  this.toggleAnswered(1);
                  setTimeout(this.onClickAnswer3, 3000);
                  // this.getQuestion();
                }}
              >
                <div className="arrow-left" />
                <div
                  className={
                    this.state.correct2
                      ? "correct"
                      : `${this.state.correct2 ? "answered" : "answer"}`
                  }
                >
                  {decoding(this.state.answers[1])}
                </div>
                <div className="arrow-right" />
              </div>

              <div
                className="full-answer"
                onClick={() => {
                  this.toggleAnswered(2);
                  setTimeout(this.onClickAnswer3, 3000);
                  // this.getQuestion();
                }}
              >
                <div className="arrow-left" />
                <div
                  className={
                    this.state.correct3
                      ? "correct"
                      : `${this.state.answered3 ? "answered" : "answer"}`
                  }
                >
                  {decoding(this.state.answers[2])}
                </div>
                <div className="arrow-right" />
              </div>

              <div
                className="full-answer"
                onClick={() => {
                  this.toggleAnswered(3);
                  setTimeout(this.onClickAnswer4, 3000);
                  // this.getQuestion();
                }}
              >
                <div className="arrow-left" />
                <div
                  className={
                    this.state.correct4
                      ? "correct"
                      : `${this.state.answered4 ? "answered" : "answer"}`
                  }
                >
                  {decoding(this.state.answers[3])}
                </div>
                <div className="arrow-right" />
              </div>
            </div>

            {/* <div>Correct: {decoding(this.state.question.correct_answer)}</div> */}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Question;
