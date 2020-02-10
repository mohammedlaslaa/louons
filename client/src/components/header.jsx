import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-4">
          <img src="../assets/img/louons.png" alt="logo_louons" />
        </div>

        <div className="col-4">
          <nav className="nav-bar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <li className="nav-item active">
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

        <div className="col-4"></div>
      </div>
    );
  }
}
export default Header;
