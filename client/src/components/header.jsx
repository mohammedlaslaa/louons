import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navbar";
import Logo from "./logo";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <Logo/>
        <NavBar/>
      </div>
    );
  }
}
export default Header;
