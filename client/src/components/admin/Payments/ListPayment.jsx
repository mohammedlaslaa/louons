import React from "react";
import PageTableList from "../PageTableList";

function ListPayment() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des paiements"
      linkapi="http://localhost:5000/louons/api/v1/payment"
      th={[
        { paymentId: "ID" },
        { title: "Titre" },
        { description: "Description" },
        { isActive: "Activer" },
        { seeMore: "Voir" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter un paiement"
      link="payments"
      linkbutton={true}
    />
  );
}

export default ListPayment;
