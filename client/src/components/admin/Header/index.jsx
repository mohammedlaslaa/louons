import React from "react";
import Logo from "../../general/Logo";
import SearchBar from "../../general/SearchBar";
import RightHeaderPart from "./RightHeaderPart";

function Header() {
  // Render the header of the admin
  return (
    <header className="row adminheader d-flex justify-content-around align-items-center">
      <div className="d-none d-lg-flex col-md-4 col-lg-2"></div>
      <div className="d-none d-lg-flex col-md-3 col-xl-2 align-items-center">
        <SearchBar />
      </div>
      <Logo specificclassname="col-6 col-md-4 col-xl-5 text-center d-flex justify-content-center align-items-center p-3 logo" />
      <RightHeaderPart />
    </header>
  );
}

export default Header;
