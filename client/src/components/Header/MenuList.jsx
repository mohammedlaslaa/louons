import React, { useState } from "react";
import { ListCategoryContext } from "../../context/ListCategoryContext";
import SearchBar from "./SearchBar";

function MenuList(props) {
  // Set state displaySubCategory to false

  const [displayCategory, setDisplayCategory] = useState("d-none");

  // Map over the menuList prop and render a list of category. When the element of the menuList is equal to "catégories", provide a new ul list from the ListSubCategory Consumer in order to display a submenu of category

  const menuList = props.menuList.map((currElt, index) => {
    if (currElt.toLowerCase() === "catégories") {
      return (
        <li
          key={index}
          className="mx-3 menuelement py-3 py-lg-0"
          onClick={() => {}}
          onMouseEnter={() => {
            setDisplayCategory("d-block");
          }}
          onMouseLeave={() => {
            setDisplayCategory("d-none");
          }}
        >
          {currElt}
          <ul className={`${displayCategory} list-unstyled listsubcategory`}>
            <ListCategoryContext.Consumer>
              {({ listCat }) =>
                listCat.map((e) => (
                  <li className="p-2 submenuelement" key={e._id}>
                    {e.title}
                  </li>
                ))
              }
            </ListCategoryContext.Consumer>
          </ul>
        </li>
      );
    } else {
      return (
        <li key={index} className="mx-3 menuelement py-3 py-lg-0">
          {currElt}
        </li>
      );
    }
  });

  return (
    // Render the ul of the menuList

    <ul
      className={`my-auto d-flex flex-column flex-lg-row justify-content-lg-center list-unstyled listmenucontainer`}
    >
      {menuList}
      <SearchBar specificClass={"d-sm-none"} isShown={true} />
    </ul>
  );
}

export default MenuList;
