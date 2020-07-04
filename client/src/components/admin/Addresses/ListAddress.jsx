import React from "react";
import PageTableList from "../PageTableList";
import Api from '../../../Classes/Api/Api.js';

function ListAddress() {  
  const ApiLink = Api.endPoint;
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des adresses"
      linkapi={`${ApiLink}/address`}
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
