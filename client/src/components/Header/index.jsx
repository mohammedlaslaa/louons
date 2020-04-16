import React from "react";
import "../../styles/header.css";
import Logo from "./Logo";
import Nav from "./Nav";
import RightSide from "./RightSide";
import SearchBar from "./SearchBar";
import Bar from "./Bar";

function Header() {
  return (
    <header className="container headercontainer d-flex align-items-center w-100">
      <Logo />
      <Nav />
      <SearchBar />
      <RightSide />
      <Bar />
    </header>
  );
}
export default Header;
