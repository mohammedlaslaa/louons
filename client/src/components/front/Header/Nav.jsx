import React, { Component } from "react";
import MenuList from "./MenuList";
import { TogglerContext } from "../../../context/TogglerContext";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMenu: [
        { link: "announces", title: "Annonces" },
        { link: "categories", title: "Catégories" },
        { link: "post_announce", title: "Déposer une annonce" },
      ],
    };
    // Bind the method to the context of the class.

    this.forceRender = this.forceRender.bind(this);
  }

  forceRender() {
    this.context.setToggle(false);
  }

  // Add an event listener resize to the window in order to reset the istoggle.

  componentDidMount() {
    window.addEventListener("resize", this.forceRender);
  }

  render() {
    return (
      <div
        className={`p-0 h-100 navmenu d-block d-lg-flex align-items-center justify-content-lg-center`}
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
