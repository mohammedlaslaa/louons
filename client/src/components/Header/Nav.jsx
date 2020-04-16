import React, { Component } from "react";
import MenuList from "./MenuList";
import { TogglerContext } from "../../context/TogglerContext";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMenu: ["Accueil", "Catégories", "Déposer Annonce"]
    };
    this.forceRender = this.forceRender.bind(this)
  }

  forceRender(){
    if( window.innerWidth > 768){
      this.setState({ force: ""});
      return this.context.setToggled(true)
    } 
  }

  componentDidMount() {
    window.addEventListener("resize", this.forceRender);
  }

  render() {
    const isShown = this.context.isToggle ? "d-block" : "d-none";
    const isWidth767 = window.innerWidth > 768 ? "col-lg-6" : "";
    console.log(isWidth767)
    return (
      <div
        className={`p-0 ${isShown} ${isWidth767} order-1 order-md-0 d-lg-flex align-items-center justify-content-md-center listmenucontainer`}
      >
        <MenuList list={this.state.listOfMenu} />
      </div>
    );
  }
}

Nav.contextType = TogglerContext;

export default Nav;
