import React from "react";
import PageTableList from "../PageTableList";

function ListAddress() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des utilisateurs"
      linkapi="http://localhost:5000/louons/api/v1/address"
      th={[
        { addressId: "ID" },
        { title: "Titre de l'adresse" },
        { user: "Utilisateur" },
        { address: "Adresse" },
        { isActive: "Activer" },
        { seeMore: "Voir" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter une adresse"
      link="addresses"
      linkbutton={true}
    />
  );
}

export default ListAddress;
