import React, { Component } from "react";
import Logo from "./logo";

class LogoApp extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialLogoState();
  }

  initialLogoState = () => {
    return {
      counter: 0,
      seconds: 0,
      minutes: 1,
      secondsToShow: "00",
      minutesToShow: "00",
      gameStart: this.props.state.gameStart, // this seems odd.
      counterDone: false,
      showScoreBoard: this.props.state.showScoreBoard // Do you use this?
    };
  };

  counterTime = () => {
    this.timer = setInterval(() => { // don't forget to clear the interval before the unmout happens
      let counter = this.state.counter;
      let seconds = this.state.seconds;
      let minutes = this.state.minutes; // You can rewrite these assignments with object destructuring
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

      /**
       * You only need the counter. The seconds, secondsToShow and minutes and minutesToShow are all derived from that
       * Isolate that into a function (or two) that receives the counter and returns the respective formatted seconds/minutes
       * Then call that/those function(s) where you need to format the values
       */

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

    if (this.state.counterDone) {
      this.setState(this.initialLogoState());
    }
  };

  render() {
    this.props.state.initialScreen === true && this.stopTime(); // This seems odd. Calling setState on render is a big no-no. Take a look at the componentWillReceiveProps to do this

    this.props.state.gameStart && !this.state.counterDone && this.counterTime(); // This seems odd. Calling setState on render is a big no-no. Take a look at the componentWillReceiveProps to do this

    return (
      <div>
        <Logo
          minutesToShow={this.state.minutesToShow}
          secondsToShow={this.state.secondsToShow}
          stateFromApp={this.props.state} // instead of passing the state from component to component, consider using context for this result.
        />
      </div>
    );
  }
}

export default LogoApp;
