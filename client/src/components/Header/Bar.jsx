import React, { useContext } from "react";
import { TogglerContext } from "../../context/TogglerMenuContext";

function Bar() {
  // Get the setToggle method from the TogglerContext

  const { setToggle } = useContext(TogglerContext);

  return (
    // Render the bars and add an event listener, which set the toggle to its opposite state on click.

    <div
      className="barcontainer mx-2 d-flex flex-column d-lg-none justify-content-center"
      onClick={() => setToggle()}
    >
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
}
export default Bar;
