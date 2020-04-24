import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

function PartOfFooter(props) {
  // map over the dataToDisplay prop in order to display them in list

  const list = props.dataToDisplay.map((elt, index) => (
    <Link key={`link${index}`} to={elt.link} className="text-white">
      <li key={`title${index}`} className="footerli p-2">
        {elt.title}
      </li>
    </Link>
  ));

  const [isDisplay, setIsDisplay] = useState(false);
  const classDisplay = isDisplay ? "d-block" : "d-none d-md-block";

  return (
    // Return each part of the footer

    <div className="col-md-4 text-center">
      <div className="d-flex align-items-center justify-content-between justify-content-sm-around flex-row flex-md-column">
        <h4 className="text-white p-2 m-0 titlefooter">{props.title}</h4>
        <i
          className="ri-menu-4-fill text-white ri-2x d-md-none"
          onClick={() => setIsDisplay(!isDisplay)}
        ></i>
      </div>
      <CSSTransition classNames="listfooter" timeout={600} in={isDisplay}>
        <ul className={`${classDisplay} list-unstyled text-white`}>{list}</ul>
      </CSSTransition>
    </div>
  );
}
export default PartOfFooter;