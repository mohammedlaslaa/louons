import React, { useState, useEffect } from "react";
import Bar from "../../general/Bar";
import SearchBar from "../../general/SearchBar";
import { Link } from "react-router-dom";

function RightSide() {
  const [isShownSearchBar, setIsShownSearchBar] = useState(false);

  // set the isshown searchbar to false when the window is resizing
  const setIsShown = () => {
    if (window.innerWidth < 576) {
      setIsShownSearchBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setIsShown);
  }, []);

  const handleIsShownSearchBar = () => setIsShownSearchBar(!isShownSearchBar);
  return (
    // Render two icons. The mail icon and the user profile icon.

    <div className="col-7 col-sm-6 col-lg-2 p-0 d-flex justify-content-end justify-content-lg-around">
      <i
        className="ri-search-line mx-2 d-none d-sm-block icon-font22 color3c8ce4"
        onClick={() => handleIsShownSearchBar()}
      ></i>
      <Link key="rightside2" className="text-decoration-none" to="/message">
        <i className="mx-1 mx-sm-2 ri-mail-fill icon-font22 color3c8ce4"></i>
      </Link>
      <Link key="rightside1" className="text-decoration-none" to="/my_account">
        <i className="mx-1 mx-sm-2 ri-user-3-fill icon-font22 color3c8ce4"></i>
      </Link>

      <SearchBar
        specificclassname={"position-absolute searchbar"}
        isShown={isShownSearchBar}
      />
      <Bar />
    </div>
  );
}
export default RightSide;
