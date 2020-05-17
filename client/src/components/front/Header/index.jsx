import React from "react";
import "../../../styles/front/header.css";
import Logo from "../../general/Logo";
import Nav from "./Nav";
import RightSide from "./RightSide";
import { TogglerProvider } from "../../../context/TogglerContext";

function Header() {
  return (
    // Return all components of the header and provide the toggle menu context to the nav and the rightside

    <header className="headercontainer row m-0 d-flex justify-content-center align-items-center mx-auto p-2">
      <Logo specificclassname="col-5 col-sm-6 col-lg-3 p-0 text-sm-left text-md-center logo" />
      <TogglerProvider>
        <Nav />
        <RightSide />
      </TogglerProvider>
    </header>
  );
}
export default Header;
