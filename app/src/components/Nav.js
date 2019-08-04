import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../imgs/one-line-logo.svg";
import { logOFF } from "../actions";

class Nav extends Component {

  componentDidMount() {
    localStorage.removeItem("jwt");
  }

  render() {
    return (
      <>
        <div className="container-main-nav">
          <div className="container-logo">
            <img src={logo} alt="logo" />
            <h2>One Line A Day</h2>
          </div>
          <div className="nav-links-container">
            <button className="nav-main-btn" onClick={()=>{
              if(this.props.loggedIn === false){
                window.alert("You are not logged in.")
              }else{
              window.alert("Logged Off")
              this.props.logOFF()
              }
            }
            }>
              Log Out
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.userID,
  entries: state.entries,
  fetching: state.fetching,
  error: state.error,
  loggedIn: state.loggedIn
});

export default connect(
  mapStateToProps,
  { logOFF }
  )(Nav); 