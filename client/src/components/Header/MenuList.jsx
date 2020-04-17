import React, { useState } from "react";
import { ListSubCategoryContext } from "../../context/SubCategoryContext";

function MenuList(props) {
  // Set state displaySubCategory to false

  const [displaySubCategory, setDisplaySubCategory] = useState("d-none");

  // Map over the menuList prop and render a list of category, then when the element of the menuList is equal to "catégories", provide a new ul list from the ListSubCategory Consumer in order to display a submenu of category
  
  const menuList = props.menuList.map((currElt, index) => {
    if (currElt.toLowerCase() === "catégories") {
      return (
        <li
          key={index}
          className="mx-3 position-relative menuelement"
          onMouseEnter={() => setDisplaySubCategory("d-block")}
          onMouseLeave={() => setDisplaySubCategory("d-none")}
        >
          {currElt}
          <ul
            className={`${displaySubCategory} list-unstyled position-absolute`}
          >
            <ListSubCategoryContext.Consumer>
              {({ listSubCat }) =>
                listSubCat.map((e) => <li key={e._id}>{e.title}</li>)
              }
            </ListSubCategoryContext.Consumer>
          </ul>
        </li>
      );
    } else {
      return (
        <li key={index} className="mx-3 menuelement">
          {currElt}
        </li>
      );
    }
  });

  return (
    // Render the ul of the menuList

    <ul
      className={`my-auto d-lg-flex justify-content-center w-100 list-unstyled listmenucontainer`}
    >
      {menuList}
    </ul>
  );
}

export default MenuList;
