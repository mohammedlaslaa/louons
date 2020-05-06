import React from "react";
import PageTableList from "../PageTableList";

function ListArticle() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des Articles"
      linkapi="http://localhost:5000/louons/api/v1/article"
      th={[
        { articleId: "ID" },
        { title: "Titre" },
        { description: "Description" },
        { category: "Catégorie" },
        { price: "Prix" },
        { isActive: "Etat" },
        { isTop: "Au top" },
        { seeMore: "Voir" },
        { date_register: "Date d'ajout" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter un article"
      link="articles"
      linkbutton={true}
    />
  );
}

export default ListArticle;
