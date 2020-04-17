import React, { useState } from "react";
import Bar from "./Bar";
import SearchBar from "./SearchBar";


function RightSide() {
  const [isShownSearchBar, setIsShownSearchBar] = useState(false);

  const handleIsShownSearchBar = () => setIsShownSearchBar(!isShownSearchBar);
  return (
    // Render two icons. The mail icon and the user profile icon.

    <div className="col-7 col-sm-6 col-lg-3 d-flex justify-content-end justify-content-lg-around">
      <i
        className="mx-2 d-none d-sm-block ri-search-line icon-font22 color3c8ce4"
        onClick={() => handleIsShownSearchBar()}
      ></i>
      <i className="mx-1 mx-sm-2 ri-user-3-fill icon-font22 color3c8ce4"></i>
      <i className="mx-1 mx-sm-2 ri-mail-fill icon-font22 color3c8ce4"></i>
      <SearchBar specificClass={"position-absolute"} isShown={isShownSearchBar} />
      <Bar />
    </div>
  );
}
export default RightSide;
