import React, { Component } from "react";
import "./GiveUpButton.css";

// No need to use state. Move this into a functional component
class GiveUpMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // no need to use state here.
  }

  render() {
    return (
      <div
        className={`give-message-line ${ // use classnames?
          this.props.state.giveUpPrompted
            ? "give-message-show"
            : "give-message-hidden"
        }`}
      >
        <div className="give">
          <div className="arrow-left-give"></div>
          <div className="give-question">Are You Sure?</div>
          <div className="arrow-right-give"></div>
        </div>
        <div className="yes-no-line">
          {
            // for the two below onClicks, no need to create new functions
          }
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
