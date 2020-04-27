import React from "react";
import PageTableList from "../PageTableList";

function ListUser() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des utilisateurs"
      linkapi="http://localhost:5000/louons/api/v1/user"
      th={[
        { clientId: "ID" },
        { gender: "Titre" },
        { lastName: "Nom" },
        { firstName: "Prénom" },
        { date_register: "Date d'inscription" },
        { isActive: "Activer" },
        { isSubscribe: "Newsletter" },
        { seeMore: "Voir" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter un utilisateur"
      link="users"
    />
  );
}

export default ListUser;
