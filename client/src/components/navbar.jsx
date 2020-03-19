import React, { Component } from "react";
import Bar from "./bar";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      listOfCat: ["Accueil", "Catégories", "Déposer Annonce"],
      listSubCat: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/louons/api/v1/category")
      .then(response => response.json())
      .then(data => {
        this.setState({
          listSubCat: data
        });
      })
      .catch(error => console.error(error));
  }

  renderListMenu() {
    return this.state.listOfCat.map(e =>
      e == "Catégories" ? (
        <li className="nav-item" key={e}>
          <a className="nav-link menulink mx-3" href="/#">
            {e}
          </a>
          <ul>
            {this.state.listSubCat.map(e => (
              <li className="list-unstyled d-none" key={e.title}>
                {e.title}
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <li className="nav-item" key={e}>
          <a className="nav-link menulink mx-3" href="/#">
            {e}
          </a>
        </li>
      )
    );
  }

  render() {
    return (
      <div className="col-6 col-lg-9 d-flex align-items-center justify-content-end justify-content-lg-between">
        <Bar />
        <nav className="nav-bar d-none d-lg-flex navbar-expand-lg navbar bg-white">
          <ul className="navbar-nav d-flex justify-content-around">
            {this.renderListMenu()}
          </ul>
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Recherche"
            ></input>
          </form>
        </nav>
      </div>
    );
  }
}

export default NavBar;
