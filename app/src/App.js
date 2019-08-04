import React, { Component } from "react";
import { Route } from "react-router-dom";
import JournalView from "./views/JournalView";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <div className="container-main-routes">
          <Route exact path="/" component={JournalView} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

