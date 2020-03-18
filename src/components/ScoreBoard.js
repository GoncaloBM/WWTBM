import React, { Component } from "react";
import "./ScoreBoard.css";

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { // since you don't set the state, you don't need to have the constructor
      scores: this.props.scoreState
    };
  }

  table = () => {
    if (this.props.scoreState) {
      return this.props.scoreState.map((score, index) => {
        const { name, question, time } = score;
        return (
          <tr key={index}>
            <td>{name}</td>
            <td>{question}</td>
            <td>{time}</td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div
        className={`scoreboard
          ${
            this.props.showScoreBoard
              ? "scoreboard-showing"
              : "scoreboard-hidden"
          }
        `}
      >
        <table id="scoreboard-table">
          <tbody>
            <tr id="top-line">
              <th>Name</th>
              <th>Question</th>
              <th>Time</th>
            </tr>
            {this.table()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ScoreBoard;
