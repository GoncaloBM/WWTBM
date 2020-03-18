import React, { Component } from "react";
import "./LoosingName.css"; // Losing :P

class LoosingName extends Component { // Losing :P
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div
        className={
          !this.props.loosingNameInputHidden
            ? "loosing-line-show"
            : "loosing-line-hidden"
        }
      >
        <input type="text" onChange={this.handleChange} />
        <input
          type="button"
          value="Submit"
          onClick={() => this.props.submitLoosingName(this.state.name)}
        />
      </div>
    );
  }
}

export default LoosingName;
