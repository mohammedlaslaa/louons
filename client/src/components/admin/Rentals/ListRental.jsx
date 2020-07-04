import React from "react";
import PageTableList from "../PageTableList";
import Api from "../../../Classes/Api/Api";


function ListRental() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content
  const ApiLink = Api.endPoint;
  return (
    <PageTableList
      titlepage="Liste des utilisateurs"
      linkapi={`${ApiLink}/rental`}
      th={[
        { rentalId: "ID" },
        { article: "Article" },
        { user: "Locataire" },
        { start_date: "Date de début" },
        { end_date: "Date de fin" },
        { seeMore: "Voir" },
      ]}
      titlebutton="Ajouter une location"
      link="rentals"
      linkbutton={true}
    />
  );
}

export default ListRental;
