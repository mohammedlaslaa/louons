import React from "react";
import PageTableList from "../PageTableList";

function ListDelivery() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content

  return (
    <PageTableList
      titlepage="Liste des livraisons"
      linkapi="http://localhost:5000/louons/api/v1/carrier/all"
      linkputapi="http://localhost:5000/louons/api/v1/carrier"
      th={[
        { carrierId: "ID" },
        { title: "Nom" },
        { description: "Description" },
        { delay_delivery: "Délai de livraison" },
        { price: "Prix" },
        { isActive: "Activer" },
        { seeMore: "Voir" },
        { delete: "Supprimer" },
      ]}
      titlebutton="Ajouter une livraison"
      link="deliveries"
      linkbutton={true}
    />
  );
}

export default ListDelivery;
