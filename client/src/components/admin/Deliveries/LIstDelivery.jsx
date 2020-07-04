import React from "react";
import PageTableList from "../PageTableList";
import Api from "../../../Classes/Api/Api";

function ListDelivery() {
  // give the all informations (api etc...) to the PageTableList component in order to display a table of the content
  const ApiLink = Api.endPoint;

  return (
    <PageTableList
      titlepage="Liste des livraisons"
      linkapi={`${ApiLink}/carrier/all`}
      linkputapi={`${ApiLink}/carrier`}
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
