import React from "react";
import PageTableList from "../PageTableList";

function ListAdmin() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des Administrateurs"
      linkapi="http://localhost:5000/louons/api/v1/admin"
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
