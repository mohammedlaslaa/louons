import React from "react";
import PageTableList from "../PageTableList";
import Api from "../../../Classes/Api/Api";

function ListArticle() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content
  const ApiLink = Api.endPoint;

  return (
    <PageTableList
      titlepage="Liste des Articles"
      linkapi={`${ApiLink}/article`}
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
