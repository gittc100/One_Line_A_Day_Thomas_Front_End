import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, NavLink, Redirect  } from "react-router-dom";
import {browserHistory} from 'react-router';
import logo from "../imgs/one-line-logo.svg";

class Nav extends Component {
  logOut = () => {
    localStorage.removeItem("jwt");
    window.alert("Logged Off");
  };
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

// export default Nav;

const mapStateToProps = state => ({
  userID: state.userID,
  entries: state.entries,
  fetching: state.fetching,
  error: state.error,
  loggedIn: state.loggedIn
});

export default connect(
  mapStateToProps,
  { }
  )(Nav); 