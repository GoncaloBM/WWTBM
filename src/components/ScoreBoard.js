import React, { Component } from "react";
import "./ScoreBoard.css";

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: this.props.scoreState
    };
  }

  table = () => {
    if (this.props.scoreState) {
      return this.props.scoreState.map((score, index) => {
        const { name, question, time } = score;
        return (
          <tr key={name}>
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
      <div className="table">
        <table>
          <tbody>{this.table()}</tbody>
        </table>
      </div>
    );
  }
}
export default ScoreBoard;
