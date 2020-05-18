import React, { useState, useContext } from "react";
import { ListCategoryContext } from "../../../context/ListCategoryContext";
import SearchBar from "../../general/SearchBar";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { TogglerContext } from "../../../context/TogglerContext";

function MenuList(props) {
  // Set state displaySubCategory to false

  const [displayCategory, setDisplayCategory] = useState(false);

  // Get the toggler context to set the isToggle to false on click in the menu link

  const { setToggle } = useContext(TogglerContext);

  // Map over the menuList prop and render a list of category. When the element of the menuList is equal to "catégories", provide a new ul list from the ListSubCategory Consumer in order to display a submenu of category

  const menuList = props.menuList.map((currElt, index) => {
    const regex = /\s/gi;
    if (currElt.link === "categories") {
      return (
        <li
          key={index}
          className="p-2 my-3 menuelement"
          onMouseEnter={() => {
            setDisplayCategory(true);
          }}
          onMouseLeave={() => {
            setDisplayCategory(false);
          }}
        >
          {currElt.title}
          <CSSTransition
            classNames="submenuelt"
            unmountOnExit
            timeout={600}
            in={displayCategory}
          >
            <ul className={`list-unstyled listcategory px-2`}>
              <ListCategoryContext.Consumer>
                {({ listCat }) =>
                  listCat.map((e) => {
                    return (
                      <Link
                        key={e._id}
                        className="submenuelement text-decoration-none"
                        to={{
                          pathname: `/categories/${e.link}`,
                          id: e._id,
                          title: e.title,
                          description: e.description,
                        }}
                      >
                        <li
                          className="p-1 my-3 font-italic submenuelement"
                          onClick={() => {
                            setToggle(false);
                            setDisplayCategory(false);
                          }}
                        >
                          {e.title}
                        </li>
                      </Link>
                    );
                  })
                }
              </ListCategoryContext.Consumer>
            </ul>
          </CSSTransition>
        </li>
      );
    } else {
      return (
        <Link
          key={index}
          className="menuelement text-decoration-none"
          to={`/${currElt.link.replace(regex, "_").normalize("NFC")}`}
        >
          <li key={index} className="p-2 my-3" onClick={() => setToggle(false)}>
            {currElt.title}
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
        <SearchBar isShown={true} specificclassname="d-md-none" />
      </ul>
    </CSSTransition>
  );
}

export default MenuList;
