import React, { Component } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "./actions";
import JournalView from "./views/JournalView";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login";
import Register from "./components/Register";
import { registerUser } from "./actions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: true
      // hardCodeUser: "user",
      // hardCodePass: "pass"
    };
  }

  componentDidMount() {
    // const loginUser = JSON.parse(localStorage.getItem("login-username"));
    // const loginPass = JSON.parse(localStorage.getItem("login-password"));
    // console.log(loginUser);
    // console.log(loginPass);
    // if (
    //   loginPass === this.state.hardCodePass &&
    //   loginUser === this.state.hardCodeUser &&
    //   this.state.loggedIn === false
    // ) {
    //   this.setState({
    //     loggedIn: true
    //   });
    // } else {
    //   this.setState({
    //     loggedIn: false
    //   });
    // }
  }

  logOut = () => {
    localStorage.setItem("login-username", JSON.stringify(""));
    localStorage.setItem("login-password", JSON.stringify(""));
    window.location.reload();
  };

  // logOut = () => {
  //   localStorage.removeItem("jwt");
  //   this.props.history.push("/login");
  // };

  render() {
    return (
      <div className="App">
        <Nav />
        <div className="container-main-routes">
          <Route exact path="/" component={JournalView} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
        {/* {this.props.userID === null?
        <><Redirect to="/login"/><div>login</div></>:<><Redirect from="/login" to="/notes"/><div>notes</div></>} */}
        <Footer />
      </div>
    );
  }
}

// export default App;

const mapStateToProps = state => ({
  userID: state.userID,
  notes: state.notes,
  note: state.note,
  fetching: state.fetching,
  error: state.error,
  loggedIn: state.loggedIn
});

export default connect(
  mapStateToProps,
  { login }
)(App); // this is the issue?
