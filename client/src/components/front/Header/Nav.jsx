import React, { Component } from "react";
import MenuList from "./MenuList";
import { TogglerContext } from "../../../context/TogglerMenuContext";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMenu: ["Annonces", "Catégories", "Déposer une annonce"],
      forceRender: false,
    };
    // Bind the method to the context of the class.

    this.forceRender = this.forceRender.bind(this);
  }

  forceRender() {
    if (this.context.isToggle) {
      console.log('coucou')
      this.setState(prevState => {
        return {
          forceRender : !prevState.forceRender
        }
      })
      this.context.setToggle(false)
    }
  }

  // Add an event listener resize to the window.

  componentDidMount() {
    window.addEventListener("resize", this.forceRender);
  }

  render() {

    return (
      <div
        className={`p-0 h-100 d-lg-flex align-items-center justify-content-lg-center`}
      >
        <MenuList
          isShown={this.context.isToggle}
          menuList={this.state.listOfMenu}
        />
      </div>
    );
  }
}

// Add the context to the class component.

Nav.contextType = TogglerContext;

export default Nav;
