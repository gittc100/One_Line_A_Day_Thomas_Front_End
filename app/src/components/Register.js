import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: ""
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.fetching !== prevProps.fetching){
      if (this.props.error) {
        window.alert(this.props.error.response.data.detail);
      }
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let {username,password,firstname,lastname,email } = this.state;
    if(username === "" || password === "" || firstname === "" || lastname === "" || email === ""){
      window.alert("Missing Entry Value");
    }else{
      this.props.register(this.state, this.props);
    }
  };

  render() {
    const { username, firstname, lastname, email, password } = this.state;
    if (this.props.fetching) {
      return <h4>Registering ...</h4>;
    }
    return (
      <form className="login-form">
        <h3>Register</h3>
        <input
          type="text"
          placeholder="User Name"
          name="username"
          value={username}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstname"
          value={firstname}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={lastname}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.handleInputChange}
        />
        <div className="login-form-btn-container">
          <button className="login-btn" onClick={this.handleSubmit}>
            Register
          </button>
          <NavLink className="nav-links" to="/login">
            Login
          </NavLink>
        </div>
      </form>
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
  { register }
  )(Register);
  
  // export default Register;