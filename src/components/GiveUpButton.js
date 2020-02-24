import React, { Component } from "react";
import "./GiveUpButton.css";

class GiveUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="give-up-line">
        <div
          className="give-up-icon"
          onClick={() => {
            this.props.giveUpClick();
          }}
        />
      </div>
    );
  }
}

export default GiveUpButton;
