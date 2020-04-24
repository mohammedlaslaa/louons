import React, { useState, useContext } from "react";
import { ListCategoryContext } from "../../../context/ListCategoryContext";
import SearchBar from "../../general/SearchBar";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { TogglerContext } from "../../../context/TogglerMenuContext";

function MenuList(props) {
  // Set state displaySubCategory to false

  const [displayCategory, setDisplayCategory] = useState(false);

  // Get the toggler context to set the isToggle to false on click in the menu link

  const { setToggle } = useContext(TogglerContext);

  // Map over the menuList prop and render a list of category. When the element of the menuList is equal to "catégories", provide a new ul list from the ListSubCategory Consumer in order to display a submenu of category

  const menuList = props.menuList.map((currElt, index) => {
    const regex = /\s/gi;
    if (currElt.toLowerCase() === "catégories") {
      return (
        <Link
          key={index}
          className="menuelement text-decoration-none"
          to={`/${currElt.toLowerCase().replace(regex, "_").normalize("NFC")}`}
        >
          <li
            key={index}
            className="p-2 my-3"
            onMouseEnter={() => {
              setDisplayCategory(true);
            }}
            onMouseLeave={() => {
              setDisplayCategory(false);
            }}
          >
            {currElt}
            <CSSTransition
              classNames="submenuelt"
              unmountOnExit
              timeout={600}
              in={displayCategory}
            >
              <ul className={`list-unstyled listcategory px-2`}>
                <ListCategoryContext.Consumer>
                  {({ listCat }) =>
                    listCat.map((e) => (
                      <li
                        className="p-1 my-3 font-italic submenuelement"
                        key={e._id}
                      >
                        {e.title}
                      </li>
                    ))
                  }
                </ListCategoryContext.Consumer>
              </ul>
            </CSSTransition>
          </li>
        </Link>
      );
    } else {
      return (
        <Link
          key={index}
          className="menuelement text-decoration-none"
          to={`/${currElt.toLowerCase().replace(regex, "_").normalize("NFC")}`}
        >
          <li key={index} className="p-2 my-3" onClick={() => setToggle(false)}>
            {currElt}
          </li>
        </Link>
      );
    }
  });

  const isShown = props.isShown && "d-flex";

  return (
    // Render the ul of the menuList depending the isShown

    <CSSTransition classNames="menuanimation" timeout={600} in={props.isShown}>
      <ul
        className={`my-auto ${isShown} d-lg-flex flex-column flex-lg-row justify-content-lg-around list-unstyled listmenucontainer`}
      >
        {menuList}
        <SearchBar isShown={true} specificClass="d-md-none" />
      </ul>
    </CSSTransition>
  );
}

export default MenuList;
