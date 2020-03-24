import React, { Component } from "react";
import { LogoContext } from "./../App";
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

  lowerTitle = () => {
    let lowerTitleArray = [
      "W",
      "H",
      "O",
      " ",
      "W",
      "A",
      "N",
      "T",
      "S",
      " ",
      "T",
      "O",
      " ",
      "B",
      "E",
      " ",
      "A"
    ];

    return lowerTitleArray.map((letter, index) => (
      <span key={index}>{letter}</span>
    ));
  };

  upperTitle = () => {
    let upperTitleArray = [
      "A",
      " ",
      "E",
      "B",
      " ",
      "O",
      "T",
      " ",
      "S",
      "T",
      "N",
      "A",
      "W",
      " ",
      "O",
      "H",
      "W"
    ];
    return upperTitleArray.map((letter, index) => (
      <span key={index}>{letter}</span>
    ));
  };

  rotateElipse = () => {
    let initialPosition = [
      this.state.rotateElipse1,
      this.state.rotateElipse2,
      this.state.rotateElipse3,
      this.state.rotateElipse4,
      this.state.rotateElipse5,
      this.state.rotateElipse6,
      this.state.rotateElipse7,
      this.state.rotateElipse8,
      this.state.rotateElipse9
    ];

    return initialPosition.map((position, index) => (
      <div
        key={index}
        className="elipse"
        style={{ transform: `rotate(${position}deg)` }}
      />
    ));
  };
  componentDidMount() {
    /*
    Whenever you use a setInterval or setTimeout in react, it's always a good practice to clear it before the component unmounts
    */
    setInterval(() => {
      let state = this.state; // Whenever you have a let VARIABLE_NAME = something.VARIABLE_NAME, you can refactor to let { VARIABLE_NAME } = something;

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
    return (
      <LogoContext.Consumer>
        {stateApp => {
          let props = this.props;
          var classNames = require("classnames");

          let wrapper = classNames(
            {
              "wrapper-hidden ":
                stateApp.publicHelpActivated || stateApp.toggleScoreBoard
            },
            {
              wrapper:
                !stateApp.publicHelpActivated || !stateApp.toggleScoreBoard
            }
          );
          return (
            <div className={wrapper}>
              <div className="logo">
                {this.rotateElipse()}
                <div className="title">
                  {!stateApp.gameStart
                    ? "Millionaire"
                    : `${props.minutesToShow}:${props.secondsToShow}`}
                </div>

                <div className="estrellas">{this.lowerTitle()}</div>

                <div className="estrellas inverso" style={{ top: "-450px" }}>
                  {this.upperTitle()}
                </div>

                <div className="inner-circle" />
              </div>
            </div>
          );
        }}
      </LogoContext.Consumer>
    );
  }
}

export default Logo;
