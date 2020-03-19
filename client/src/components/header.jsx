import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./navbar";
import Logo from "./logo";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="container-fluid">
        <div className="row w80 mx-auto py-3">
          <Logo />
          <NavBar />
        </div>
      </header>
    );
  }
}
export default Header;
