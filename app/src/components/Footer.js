import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import logo from "../imgs/one-line-logo.svg";

class Footer extends Component {
  render() {
    return (
      <>
        <div className="container-main-footer">
          <p>THOMAS CLAYDON ©2019</p>
        </div>
      </>
    );
  }
}

export default Footer;
