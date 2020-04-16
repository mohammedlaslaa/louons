import React, { useState } from "react";
import { ListSubCategoryContext } from "../../context/SubCategoryContext";

function MenuList(props) {
  const [displaySubCatgeory, setDisplaySubCategory] = useState("d-none");
  const listMenu = props.list.map((currElt, index) => {
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
            className={`${displaySubCatgeory} list-unstyled position-absolute`}
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
    <>
      <ul
        className={`my-auto d-md-flex justify-content-center w-100 list-unstyled listmenucontainer`}
      >
        {listMenu}
      </ul>
    </>
  );
}
export default MenuList;
