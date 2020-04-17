import React from "react";
import Bar from "./Bar";

function RightSide() {
  return (
    // Render two icons. The mail icon and the user profile icon.
    
    <div className="col-7 col-sm-6 col-lg-2 d-flex justify-content-end justify-content-lg-center">
      <i className="mx-2 ri-user-3-fill icon-font24 color3c8ce4"></i>
      <i className="mx-2 ri-mail-fill icon-font24 color3c8ce4"></i>
      <Bar />
    </div>
  );
}
export default RightSide;
