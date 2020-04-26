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
        { description: "Nom" },
        { category: "Catégorie" },
        { price: "Prix" },
        { seeMore: "Voir" },
        { date_register: "Date d'ajout" },
      ]}
      titlebutton="Ajouter un article"
      linkbutton="articles/add"
    />
  );
}

export default ListArticle;
