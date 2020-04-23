import React from "react";

function Logo(props) {
  return (
    // Just render an image logo with specific class setting in props
    
    <div className={props.specificClass}>
      <img
        src="/assets/img/louons.png"
        alt="logo_louons"
        className="w-100 img-fluid logoimg"
      />
    </div>
  );
}

export default Logo;
