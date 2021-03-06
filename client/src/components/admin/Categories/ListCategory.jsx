import React, { useContext } from "react";
import PageTableList from "../PageTableList";
import PopupAdmin from "../../general/PopupAdmin";
import { PopupAddContext } from "../../../context/PopupAddContext";
import CategoryFormLogic from "./CategoryFormLogic";

function ListCategory() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content
  const popupcontext = useContext(PopupAddContext);

  return (
    <>
      <PopupAdmin isToggle={popupcontext.isToggle} render={<CategoryFormLogic title="Ajouter"/>}/>
      <PageTableList
        titlepage="Liste des catégories"
        linkapi="https://louonsapptest.herokuapp.com/louons/api/v1/category/all"
        linkputapi="https://louonsapptest.herokuapp.com/louons/api/v1/category"
        th={[
          { categoryId: "ID" },
          { title: "Titre" },
          { isActive: "Activer" },
          { seeMore: "Voir" },
          { delete: "Supprimer" },
        ]}
        titlebutton="Ajouter une catégorie"
        link="categories"
      />
    </>
  );
}

export default ListCategory;
