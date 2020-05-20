import React from "react";
import moment from "moment";

function Rental(props) {
  const {
    rentalId,
    date_register,
    start_date,
    end_date,
    id_carrier,
    id_payment,
    id_article,
    isActive,
    total_price,
  } = props.datarental;

  return (
    <>
      <h4 className="subtitle-profil text-left mb-4 color3c8ce4 mt-5">
        Location N° {rentalId}
      </h4>
      <i
        className="ri-arrow-go-back-line go-back-my-account ri-lg position-absolute"
        onClick={() => props.history.goBack()}
      ></i>
      <div className="row">
        <p className="col-12 col-sm-6">
          Date de commande : {moment(date_register).format("DD-MM-YYYY")}
        </p>
        <p className="col-12 col-sm-6">Prix total : {total_price} €</p>
      </div>
      <div className="row">
        <p className="col-12 col-sm-6">
          Article : {id_article && id_article.title}
        </p>
        <p className="col-12 col-sm-6">
          Etat : {isActive ? "Active" : "Annulée"}
        </p>
      </div>
      <div className="row">
        <p className="col-12 col-sm-6">
          Date de début : {moment(start_date).format("DD-MM-YYYY")}
        </p>
        <p className="col-12 col-sm-6">
          Date de fin : {moment(end_date).format("DD-MM-YYYY")}
        </p>
      </div>
      <div className="row">
        <p className="col-12 col-sm-6">
          Livraison : {id_carrier && id_carrier.title}
        </p>
        <p className="col-12 col-sm-6">
          Paiement : {id_payment && id_payment.title}
        </p>
      </div>
    </>
  );
}

export default Rental;
