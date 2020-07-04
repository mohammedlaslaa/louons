import React from "react";
import PageTableList from "../PageTableList";
import Api from "../../../Classes/Api/Api";

function ListPayment() {
  const ApiLink = Api.endPoint;
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des paiements"
      linkapi={`${ApiLink}/payment/all`}
      linkputapi={`${ApiLink}/payment`}
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
