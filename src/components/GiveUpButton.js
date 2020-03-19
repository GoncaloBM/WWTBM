import React, { Component } from "react";
import "./GiveUpButton.css";

// This can be a function component
class GiveUpButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="give-up-line">
        <div className="give-up-icon" onClick={this.props.giveUpClick}>
          I Give Up
        </div>
      </div>
    );
  }
}

export default GiveUpButton;
