import React from "react";

function Logo() {
  return (
    // Just render an image logo
    
    <div className="col-5 col-sm-6 col-lg-2 p-0 text-center text-md-left logocontainer">
      <img
        src="../assets/img/louons.png"
        alt="logo_louons"
        className="w-100 img-fluid logoimg"
      />
    </div>
  );
}

export default Logo;
