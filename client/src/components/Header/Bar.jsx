import React, { useContext } from "react";
import { TogglerContext } from "../../context/TogglerContext";

function Bar() {
  const { setToggled } = useContext(TogglerContext);

  return (
    <div
      className="col-3 col-md-2 containbar d-flex flex-column d-lg-none"
      onClick={() => setToggled()}
    >
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
}
export default Bar;
