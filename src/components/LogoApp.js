import React, { Component } from "react";
import Logo from "./logo";

class LogoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      seconds: 0,
      minutes: 1,
      secondsToShow: "00",
      minutesToShow: "00",
      gameStart: props.state.gameStart,
      counterDone: false
    };
  }

  counterTime = () => {
    this.timer = setInterval(() => {
      let counter = this.state.counter;
      let seconds = this.state.seconds;
      let minutes = this.state.minutes;
      let secondsToShow = "";
      let minutesToShow = "";

      if (seconds < 10) {
        secondsToShow = `0${seconds.toString()}`;
      } else {
        secondsToShow = `${seconds.toString()}`;
      }

      if (minutes < 10) {
        minutesToShow = `0${minutes.toString()}`;
      } else {
        minutesToShow = `${minutes.toString()}`;
      }

      if (seconds !== 59) {
        this.setState({
          counter: counter + 1,
          seconds: seconds + 1,
          secondsToShow: secondsToShow
        });
      } else if (seconds === 59) {
        this.setState({
          counter: counter + 1,
          seconds: 0,
          secondsToShow: secondsToShow,
          minutes: minutes + 1,
          minutesToShow: minutesToShow
        });
      }
      this.props.countToApp(this.state.counter);
    }, 1000);
    this.setState({
      counterDone: true
    });
  };

  stopTime = () => {
    clearInterval(this.timer);
  };

  render() {
    {
      this.props.state.gameStart &&
        !this.state.counterDone &&
        this.counterTime();
    }
    return (
      <div>
        <Logo
          minutesToShow={this.state.minutesToShow}
          secondsToShow={this.state.secondsToShow}
          stateFromApp={this.props.state}
        />
      </div>
    );
  }
}

export default LogoApp;
