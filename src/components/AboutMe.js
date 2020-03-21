import React from "react";
import "./AboutMe.css";

export const AboutMe = props => {
  var classNames = require("classnames");
  let showingAbout = classNames(
    { "about-not-selected": !props.aboutMeToggle },
    { "about-selected": props.aboutMeToggle },
    { "about-hidden": props.gameStart }
  );
  return (
    <div
      id="circle"
      className={showingAbout}
      onClick={() => props.clickAbout()}
    >
      <h1>About me</h1>
      <img src={require("./Images/me.png")} alt="" />
      <h2 className="name">Gonçalo Mira</h2>
      <h3>Wild Code Student</h3>
    </div>
  );
};
