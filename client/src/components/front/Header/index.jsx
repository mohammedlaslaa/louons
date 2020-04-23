import React from "react";
import "../../../styles/front/header.css";
import Logo from "../../general/Logo";
import Nav from "./Nav";
import RightSide from "./RightSide";
import { ToggleMenuProvider } from "../../../context/TogglerMenuContext";

function Header() {
  return (
    // Return all components of the header and provide the toggle menu context to the nav and the rightside

    <header className="headercontainer row m-0 d-flex align-items-center mx-auto">
      <Logo specificClass="col-5 col-sm-6 col-lg-2 p-0 text-center text-md-left" />
      <ToggleMenuProvider>
          <Nav />
          <RightSide />
      </ToggleMenuProvider>
    </header>
  );
}
export default Header;
