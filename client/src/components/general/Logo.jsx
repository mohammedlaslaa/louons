import React from "react";
import { Link } from "react-router-dom";

function Logo(props) {
  return (
    // Just render an image logo with specific class setting in props

    <div className={props.specificclassname}>
      <Link to="/">
        <img
          src="/assets/img/louons.png"
          alt="logo_louons"
          className="w-100 img-fluid logoimg mx-0 mx-sm-2 mx-md-0"
        />
      </Link>
    </div>
  );
}

export default Logo;
