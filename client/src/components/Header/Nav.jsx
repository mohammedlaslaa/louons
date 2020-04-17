import React, { Component } from "react";
import MenuList from "./MenuList";
import { TogglerContext } from "../../context/TogglerMenuContext";

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

  // This method is called when the windows is resized and allow to force rendering by setting the state forceRender when it's necessary.
  // The force rendering is necessary when certain classes need to be updated depending on screen size and context state.
  // There are 3 situations that the re-render is needed when the window is resizing:
  // 1. When the window width is greather or equal than 992px and the isToggle context is settled to true. In this case, set the forceRender to true and setToggle context to false.
  // 2. When the window width is greather or equal than 992px and the forceRender state is settled to false. In this case, set the forceRender to its opposite and setToggle context to false.
  // 3. When the window width is less than 992px and the forceRender state is settled to true. In this case, just set the forceRender to false to be sure to match one of the previous conditions if the window was resized again.

  forceRender() {
    if (window.innerWidth >= 992 && this.context.isToggle) {
      this.setState({ forceReRender: true });
      return this.context.setToggle(false);
    } else if (window.innerWidth >= 992 && !this.state.forceRender) {
      this.setState((prevstate) => {
        return {
          forceRender: !prevstate.forceRender,
        };
      });
      return this.context.setToggle(false);
    } else if (window.innerWidth < 992 && this.state.forceRender) {
      this.setState({
        forceRender: false,
      });
    }
  }

  // Add an event listener resize to the window.

  componentDidMount() {
    window.addEventListener("resize", this.forceRender);
  }

  render() {
    // These variable take conditional values ​​in certain cases and add certain classes necessary for rendering. Then render the menulist with the menuList prop.

    const isShown = this.context.isToggle ? "d-block" : "d-none";
    const isWidth767 = window.innerWidth > 992 ? "col-lg-7" : "";

    return (
      <div
        className={`p-0 ${isShown} ${isWidth767} d-lg-flex align-items-center justify-content-lg-center`}
      >
        <MenuList menuList={this.state.listOfMenu} />
      </div>
    );
  }
}

// Add the context to the class component.

Nav.contextType = TogglerContext;

export default Nav;
