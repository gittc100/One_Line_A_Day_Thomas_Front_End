import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import logo from "../imgs/one-line-logo.svg";

class Nav extends Component {
  render() {
    return (
      <>
        <div className="container-main-nav">
          <div className="container-logo">
            <img src={logo} alt="logo" />
            <h2>One Line A Day</h2>
          </div>
          <div className="nav-links-container">
            <button className="nav-main-btn" onClick={this.logOut}>
              Log Out
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
