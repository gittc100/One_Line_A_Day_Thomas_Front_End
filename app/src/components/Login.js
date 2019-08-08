import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { Route, NavLink } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.isFetching !== prevProps.isFetching && !this.props.isFetching){
      if (this.props.error) {
        window.alert(this.props.error.response.data.message);
      }
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    if(this.state.username === "" || this.state.password === ""){
      window.alert("Missing Entry Value");
    }else{
    this.props.login({
      username: this.state.username,
      password: this.state.password
    }, this.props);
  }
  };

  render() {
    if (this.props.isFetching) {
      return <h4>Loggin In ...</h4>;
    }
    return (
      <form className="login-form">
        <h3>Login</h3>
        <input
          type="text"
          placeholder="User Name"
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <div className="login-form-btn-container">
          <button className="login-btn" onClick={this.submitHandler}>
            Login
          </button>
          <NavLink className="nav-links" to="/register">
            Sign Up
          </NavLink>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.fetching,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
