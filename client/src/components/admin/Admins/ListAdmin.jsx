import React from "react";
import PageTableList from "../PageTableList";
import Api from "../../../Classes/Api/Api";

function ListAdmin() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content
  const ApiLink = Api.endPoint;
  return (
    <PageTableList
      titlepage="Liste des Administrateurs"
      linkapi={`${ApiLink}/admin`}
      th={[
        { adminId: "ID" },
        { lastName: "Nom" },
        { firstName: "Prénom" },
        { adminLevel: "Role" },
        { isActive: "Activer" },
        { seeMore: "Voir" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter un Admin"
      link="admins"
      linkbutton={true}
    />
  );
}

export default ListAdmin;
