import React, { Component } from "react";
import decoding from "./DecodingFunction";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: []
    };
  }

  getQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ question: data.results[0] });
      });
  }

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
        <div>{decoding(this.state.question.question)}</div>
        <div>{decoding(this.state.question.correct_answer)}</div>
        <div>{this.state.question.incorrect_answers}</div>
      </div>
    );
  }
}

export default Question;
