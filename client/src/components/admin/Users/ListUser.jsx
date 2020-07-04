import React from "react";
import PageTableList from "../PageTableList";
import Api from "../../../Classes/Api/Api";

function ListUser() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content
  const ApiLink = Api.endPoint;
  return (
    <PageTableList
      titlepage="Liste des utilisateurs"
      linkapi={`${ApiLink}/user/all`}
      linkputapi={`${ApiLink}/user`}
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
      linkbutton={true}
    />
  );
}

export default ListUser;
