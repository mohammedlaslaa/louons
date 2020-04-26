import React from "react";
import PageTableList from "../PageTableList";

function ListCategory() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des catégories"
      linkapi="http://localhost:5000/louons/api/v1/category"
      th={[
        { categoryId: "ID" },
        { title: "Titre" },
        { isActive: "Activer" },
        { seeMore: "Voir" },
      ]}
      titlebutton="Ajouter une catégorie"
      linkbutton="categories/add"
    />
  );
}

export default ListCategory;
