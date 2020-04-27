import React from "react";
import PageTableList from "../PageTableList";

function ListDelivery() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des livraisons"
      linkapi="http://localhost:5000/louons/api/v1/carrier"
      th={[
        { carrierId: "ID" },
        { title: "Nom" },
        { description: "Description" },
        { isActive: "Activer" },
        { seeMore: "Voir" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter une catégorie"
      link="deliveries"
    />
  );
}

export default ListDelivery;
