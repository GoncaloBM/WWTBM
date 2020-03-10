import React, { Component } from "react";
import "./logo.css";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateElipse1: 20,
      rotateElipse2: 40,
      rotateElipse3: 60,
      rotateElipse4: 80,
      rotateElipse5: 100,
      rotateElipse6: 120,
      rotateElipse7: 140,
      rotateElipse8: 160,
      rotateElipse9: 180
    };
  }

  componentDidMount() {
    setInterval(() => {
      let state = this.state;
      this.setState({
        rotateElipse1: state.rotateElipse1 + 1,
        rotateElipse2: state.rotateElipse2 + 1,
        rotateElipse3: state.rotateElipse3 + 1,
        rotateElipse4: state.rotateElipse4 + 1,
        rotateElipse5: state.rotateElipse5 + 1,
        rotateElipse6: state.rotateElipse6 + 1,
        rotateElipse7: state.rotateElipse7 + 1,
        rotateElipse8: state.rotateElipse8 + 1,
        rotateElipse9: state.rotateElipse9 + 1
      });
    }, 50);
  }

  render() {
    let props = this.props;
    return (
      <div
        className={
          props.stateFromApp.publicHelpActivated ||
          props.stateFromApp.showScoreBoard
            ? "wrapper-hidden "
            : "wrapper"
        }
      >
        <div className="logo">
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse1}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse2}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse3}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse4}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse5}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse6}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse7}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse8}deg)` }}
          />
          <div
            className="elipse"
            style={{ transform: `rotate(${this.state.rotateElipse9}deg)` }}
          />
          <div className="title">
            {props.stateFromApp.gameStart === false
              ? "Millionaire"
              : `${props.minutesToShow}:${props.secondsToShow}`}
          </div>

          <div class="estrellas">
            <span>W</span>
            <span>H</span>
            <span>O</span>
            <span> </span>
            <span>W</span>
            <span>A</span>
            <span>N</span>
            <span>T</span>
            <span>S</span>
            <span> </span>
            <span>T</span>
            <span>O</span>
            <span> </span>
            <span>B</span>
            <span>E</span>
            <span> </span>
            <span>A</span>
          </div>

          <div class="estrellas inverso" style={{ top: "-450px" }}>
            <span>A</span>
            <span> </span>
            <span>E</span>
            <span>B</span>
            <span> </span>
            <span>O</span>
            <span>T</span>
            <span> </span>
            <span>S</span>
            <span>T</span>
            <span>N</span>
            <span>A</span>
            <span>W</span>
            <span> </span>
            <span>O</span>
            <span>H</span>
            <span>W</span>
          </div>

          <div className="inner-circle" />
        </div>
      </div>
    );
  }
}

export default Logo;
