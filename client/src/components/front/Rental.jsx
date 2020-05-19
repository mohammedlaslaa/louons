import React, { useState, useEffect } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import TableRental from "./TableRental";

function Rental(props) {
  const data = Cookies.getJSON("article");

  const [rental, setRental] = useState({
    currentStep: 1,
    selectedDelivery: "",
    selectedPayment: "",
    delivery: [],
    payment: [],
    registered: false,
  });

  useEffect(() => {
    if (rental.currentStep === 2 && rental.delivery.length === 0) {
      fetch("http://localhost:5000/louons/api/v1/carrier/all")
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setRental((prevState) => ({ ...prevState, delivery: result.data }));
          }
        });
    }

    if (rental.currentStep === 3 && rental.payment.length === 0) {
      fetch("http://localhost:5000/louons/api/v1/payment/all")
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setRental((prevState) => ({ ...prevState, payment: result.data }));
          }
        });
    }
  }, [rental]);

  const handleCreateRental = () => {
    const body = JSON.stringify({
      id_payment: rental.selectedPayment,
      id_carrier: rental.selectedDelivery,
      id_article: data.article._id,
      id_user: data.id_user,
      total_price: data.numberDay * data.article.price,
      start_date: data.dateStart,
      end_date: data.dateEnd,
    });

    fetch("http://localhost:5000/louons/api/v1/rental", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          Cookies.remove("article");
          setRental({
            currentStep: 1,
            selectedDelivery: "",
            selectedPayment: "",
            delivery: [],
            payment: [],
            registered: true,
          });
          setTimeout(() => {
            setRental((prevState) => ({ ...prevState, registered: false }));
            props.history.push("/my_account/rentals");
          }, 2500);
        }
      });
  };

  return (
    <>
      <h2 className="col-12 text-center my-2 my-md-3">Tunnel de commande</h2>
      <div className="col-12 col-lg-10 mx-auto">
        <div className="row d-flex justify-content-center col-12 col-md-10 col-lg-12 mx-auto">
          <div
            className={`col-12 col-md-4 ${
              rental.currentStep === 1 && "bgcolor144c84 text-white"
            }`}
          >
            <p className="step-title text-center m-0 p-2">1/ Récapitulatif</p>
          </div>
          <div
            className={`col-12 col-md-4 ${
              rental.currentStep === 2 && "bgcolor144c84 text-white"
            }`}
          >
            <p className="step-title text-center m-0 p-2">2/ Livraison</p>
          </div>
          <div
            className={`col-12 col-md-4 ${
              rental.currentStep === 3 && "bgcolor144c84 text-white"
            }`}
          >
            <p className="step-title text-center m-0 p-2">3/ Paiement</p>
          </div>
          <div className="col-12 content-rental p-0">
            {rental.registered ? (
              <p className="text-white text-center bg-success p-3 mt-3">
                Location enregistré avec succés !
              </p>
            ) : rental.currentStep === 1 ? (
              data && data.article ? (
                <>
                  <div className="d-flex flex-wrap">
                    <h5 className="col-12 font-weight-bold text-center my-3 title-part-rental-step">
                      Article
                    </h5>
                    <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-right">
                        Nom de l'article :
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-left">
                        {data.article.title}
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-right">
                        Prix :
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-left">{`${data.article.price} €/jr`}</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <img
                        className="img-fluid thumbnail-article-rental"
                        src={`http://localhost:5000/uploads/img/${data.article.pictures[0].path_picture}`}
                        alt="main_picture_article"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap">
                    <h5 className="col-12 font-weight-bold text-center title-part-rental-step">
                      Réservation
                    </h5>
                    <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-right">
                        Nombre de jour :
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-left">
                        {data.numberDay}
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-right">
                        Prix total :
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-left">{`${
                        data.numberDay * data.article.price
                      } €`}</p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-right">
                        Date de début :
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-left">
                        {moment(data.dateStart).format("DD/MM/YYYY")}
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-right">
                        Date de fin :
                      </p>
                      <p className="col-12 col-sm-6 col-md-5 col-lg-3 text-center text-lg-left">
                        {moment(data.dateEnd).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center my-4">Aucun article choisi</p>
              )
            ) : rental.currentStep === 2 ? (
              <TableRental
                setRental={setRental}
                data={rental.delivery}
                propertyvalue="selectedDelivery"
                isChecked={rental.selectedDelivery}
              />
            ) : rental.currentStep === 3 ? (
              <TableRental
                setRental={setRental}
                data={rental.payment}
                propertyvalue="selectedPayment"
                isChecked={rental.selectedPayment}
              />
            ) : (
              <p>Page introuvable</p>
            )}
          </div>
          {data && data.article && (
            <div className="col-12 d-flex justify-content-center justify-content-md-end my-3">
              {rental.currentStep > 1 && (
                <button
                  className="btn bgcolor144c84 text-white mx-3"
                  onClick={() => {
                    setRental((prevState) => ({
                      ...prevState,
                      currentStep: prevState.currentStep - 1,
                    }));
                  }}
                >
                  {rental.currentStep === 2
                    ? "<< Récapitulatif"
                    : "<< Livraison"}
                </button>
              )}
              {rental.currentStep < 3 && (
                <button
                  className="btn bgcolor144c84 text-white mx-3"
                  onClick={() => {
                    if (rental.currentStep === 1 || rental.selectedDelivery) {
                      setRental((prevState) => ({
                        ...prevState,
                        currentStep: prevState.currentStep + 1,
                      }));
                    }
                  }}
                >
                  {rental.currentStep === 1 ? "Livraison >>" : "Paiement >>"}
                </button>
              )}
              {rental.currentStep === 3 && rental.selectedPayment && (
                <button
                  className="btn bgcolor144c84 text-white mx-3"
                  onClick={() => handleCreateRental()}
                >
                  Valider
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Rental;
