import React, { Component } from "react";
import './buttonDrawer.css'

export const ButtonDrawer = () => {
  return (
    <div className='drawer-button'>
      <div className="bar-button" id='bar1'></div>
      <div className="bar-button" id='bar2'></div>
      <div className="bar-button" id='bar3'></div>
    </div>
  );
};
