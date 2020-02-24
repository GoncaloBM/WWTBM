import React, { Component } from "react";
import "./GiveUpButton.css";

class GiveUpMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`give-message-line ${
          this.props.state.giveUpPrompted
            ? "give-message-show"
            : "give-message-hidden"
        }`}
      >
        <div className="give-question">Are You Sure?</div>
        <div className="yes-no-line">
          <div className="button" onClick={() => this.props.giveUp()}>
            Yes
          </div>
          <div className="button" onClick={() => this.props.giveUpClick()}>
            No
          </div>
        </div>
      </div>
    );
  }
}

export default GiveUpMessage;
