import React, { useContext } from "react";
import { PopupAddContext } from "../../context/PopupAddContext";

function PopupAdmin(props) {
  //Render a component in a popup

  const classDisplay = props.isToggle ? "d-block" : "d-none";

  // get the popupcontext to display or no the div
  const PopupContext = useContext(PopupAddContext);

  return (
    <div className={`${classDisplay} addpopupcontainer bgcolor9cd1ff`}>
      <div className="d-flex justify-content-end p-2">
        <i
          className="ri-close-circle-line ri-2x"
          onClick={() => PopupContext.setToggle(!PopupContext.isToggle)}
        ></i>
      </div>
      {props.render}
    </div>
  );
}

export default PopupAdmin;
