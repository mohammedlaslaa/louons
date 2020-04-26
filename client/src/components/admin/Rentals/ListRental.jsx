import React from "react";
import PageTableList from "../PageTableList";

function ListRental() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des utilisateurs"
      linkapi="http://localhost:5000/louons/api/v1/rental"
      th={[
        { rentalId: "ID" },
        { article: "Article" },
        { user: "Locataire" },
        { start_date: "Date de début" },
        { end_date: "Date de fin" },
        { seeMore: "Voir" },
      ]}
      titlebutton="Ajouter une location"
      linkbutton="rentals/add"
    />
  );
}

export default ListRental;
