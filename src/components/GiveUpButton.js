import React, { Component } from "react";
import "./GiveUpButton.css";

// This can be a function component
class GiveUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // no need to use state
  }

  render() {
    return (
      <div className="give-up-line">
        <div
          className="give-up-icon"
          onClick={() => { // no need for a new function here
            this.props.giveUpClick();
          }}
        >I Give Up</div>
      </div>
    );
  }
}

export default GiveUpButton;
