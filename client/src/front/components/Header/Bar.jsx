import React, { useContext } from "react";
import { TogglerContext } from "../../context/TogglerMenuContext";
import { CSSTransition } from "react-transition-group";

function Bar() {
  // Get the setToggle method from the TogglerContext

  const { isToggle, setToggle } = useContext(TogglerContext);

  return (
    // Render the bars and add an event listener, which set the toggle to its opposite state on click.

    <div
      className="barcontainer mx-1 mx-sm-3 d-flex flex-column d-lg-none align-items-end justify-content-center"
      onClick={(e) => setToggle()}
    >
      <CSSTransition classNames="bar1" timeout={800} in={isToggle}>
        <div className="bar bar1"></div>
      </CSSTransition>
      <CSSTransition classNames="bar2" timeout={800} in={isToggle}>
        <div className="bar bar2"></div>
      </CSSTransition>
      <CSSTransition classNames="bar3" timeout={800} in={isToggle}>
        <div className="bar bar3"></div>
      </CSSTransition>
    </div>
  );
}
export default Bar;
