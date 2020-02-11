import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="col-6 d-flex align-items-center justify-content-center">
        <div className="containbar">
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
        </div>
        <nav className="nav-bar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav d-flex justify-content-around">
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Accueil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Catégories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Déposer une annonce
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
