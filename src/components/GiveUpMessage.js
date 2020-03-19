import React, { Component } from "react";
import "./GiveUpButton.css";

// No need to use state. Move this into a functional component
class GiveUpMessage extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    var classNames = require("classnames");
    let messageLine = classNames(
      "give-message-line",
      { "give-message-show": this.props.giveUpPrompted },
      { "give-message-hidden": !this.props.giveUpPrompted }
    );
    return (
      <div className={messageLine}>
        <div className="give">
          <div className="arrow-left-give"></div>
          <div className="give-question">Are You Sure?</div>
          <div className="arrow-right-give"></div>
        </div>
        <div className="yes-no-line">
          <div className="button" onClick={this.props.giveUp}>
            Yes
          </div>
          <div className="button" onClick={this.props.giveUpClick}>
            No
          </div>
        </div>
      </div>
    );
  }
}

export default GiveUpMessage;
