import React from "react";
import Logo from "../../general/Logo";
import SearchBar from "../../general/SearchBar";
import RightHeaderPart from "./RightHeaderPart";
import "../../../styles/admin/header.css";

function Header() {
  // Render the header of the admin
  return (
    <header className="row adminheader d-flex justify-content-around align-items-center">
      <div className="d-none d-md-flex col-md-4 align-items-center">
        <SearchBar />
      </div>
      <Logo specificClass="col-6 col-md-4 text-center d-flex justify-content-center align-items-center p-0" />
      <RightHeaderPart />
    </header>
  );
}

export default Header;
