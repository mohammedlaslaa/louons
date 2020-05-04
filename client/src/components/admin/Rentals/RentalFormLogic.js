import React, { useState, useEffect } from "react";
import RentalForm from "./RentalForm";
import { useParams } from "react-router-dom";

function RentalFormLogic(props) {
  const [method, setMethod] = useState("POST");
  const [isSuccess, setIssuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [statusMessageForm, setStatusMessageForm] = useState("enregistré");
  const [graspArticle, setGraspArticle] = useState("");
  const [graspTenant, setGraspTenant] = useState("");
  const [idTenant, setIdTenant] = useState("");
  const [idOwnerArticle, setIdOwnerArticle] = useState("");
  const [errorSameUser, setErrorSameUser] = useState(false);
  const [owner, setOwner] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveries, setDeliveries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [idArticle, setIdArticle] = useState("");
  const [idDelivery, setIdDelivery] = useState("");
  const [idPayment, setIdPayment] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorGraspArticle, setErrorGraspArticle] = useState(false);
  const [errorGraspTenant, setErrorGraspTenant] = useState(false);
  const [errorDelivery, setErrorDelivery] = useState(false);
  const [errorPayment, setErrorPayment] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [isFetchedArticle, setIsFetchedArticle] = useState(false);
  const [isFetchedDeliveries, setIsFetchedDeliveries] = useState(false);
  const [isFetchedPayments, setIsFetchedPayments] = useState(false);
  const idParams = useParams().id;

  useEffect(() => {
    // reset the number error of the form and the error file

    if (numberErrorForm > 0) {
      setNumberErrorForm(0);
    }

    if (method === "POST" && idParams) {
      setMethod("PUT");
      setStatusMessageForm("modifié");
    }

    // get the owner of the article when the article is settled

    if (idArticle) {
      fetch(`http://localhost:5000/louons/api/v1/article/detail/${idArticle}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIdOwnerArticle(result.id_user._id);
            setOwner(`${result.id_user.lastName} ${result.id_user.firstName}`);
            setIsFetchedArticle(true);
          }
        });
    }
    // if (idArticle) {
    //   fetch(`http://localhost:5000/louons/api/v1/rental/date/${idArticle}/5`, {
    //     credentials: "include",
    //   })
    //     .then((res) => res.json())
    //     .then((result) => {
    //       console.log(result)
    //     }).catch(e=> console.log(e));
    //   }

    // fetch the datas if isFetched is false, then set this to true
    // if there are not error set the category state with the result.data value

    if (!isFetchedDeliveries) {
      fetch("http://localhost:5000/louons/api/v1/carrier/all/activecarrier", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setDeliveries(result.data);
            setIsFetchedDeliveries(true);
          }
        });
    }

    if (!isFetchedPayments) {
      fetch("http://localhost:5000/louons/api/v1/payment/all/activepayment", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setPayments(result.data);
            setIsFetchedPayments(true);
          }
        });
    }

    // condition to display some error in the form

    if (idOwnerArticle === idTenant && idOwnerArticle !== "") {
      setErrorSameUser(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorSameUser(false);
    }

    if (idDelivery === "") {
      setErrorDelivery(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorDelivery(false);
    }

    if (idPayment === "") {
      setErrorPayment(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorPayment(false);
    }

    if (graspArticle === "" || idArticle === "") {
      setErrorGraspArticle(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorGraspArticle(false);
    }

    if (graspTenant === "" || idTenant === "") {
      setErrorGraspTenant(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorGraspTenant(false);
    }

    if (numberErrorForm > 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [
    idArticle,
    isFetchedDeliveries,
    isFetchedPayments,
    idDelivery,
    idOwnerArticle,
    idTenant,
    idPayment,
    numberErrorForm,
    graspTenant,
    graspArticle,
    idParams,
    method,
    isFetchedArticle,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(true);

    const url =
      method === "POST"
        ? "http://localhost:5000/louons/api/v1/rental"
        : `http://localhost:5000/louons/api/v1/rental/${idParams}`;

    const data = JSON.stringify({
      id_payment: idPayment,
      id_carrier: idDelivery,
      id_article: idArticle,
      id_user: idTenant,
      start_date: dateStart,
      end_date: dateEnd,
    });

    if (!errorForm) {
      fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIssuccess(true);
            setTimeout(() => {
              setIssuccess(false);
            }, 1500);
            if (method === "POST") {
              setIdArticle("");
              setIsSubmit(false);
              setGraspArticle("");
              setGraspTenant("");
              setIdTenant("");
              setIdOwnerArticle("");
              setOwner("");
              setIdDelivery("");
              setIdPayment("");
              setDateStart("");
              setDateEnd("");
              setIsSubmit("");
            }
          } else {
            setIsFailed(true);
            setTimeout(() => {
              setIsFailed(false);
            }, 1500);
          }
        });
    }
  };

  return (
    <RentalForm
      titlepage={props.title}
      isFailed={isFailed}
      isSuccess={isSuccess}
      statusMessageForm={statusMessageForm}
      errorGraspArticle={errorGraspArticle}
      errorGraspTenant={errorGraspTenant}
      errorDelivery={errorDelivery}
      errorPayment={errorPayment}
      idParams={idParams}
      graspArticle={graspArticle}
      graspTenant={graspTenant}
      setGraspArticle={setGraspArticle}
      setGraspTenant={setGraspTenant}
      setIdArticle={setIdArticle}
      setIdTenant={setIdTenant}
      setErrorGraspArticle={setErrorGraspArticle}
      setErrorGraspTenant={setErrorGraspTenant}
      totalPrice={totalPrice}
      owner={owner}
      deliveries={deliveries}
      payments={payments}
      idDelivery={idDelivery}
      idPayment={idPayment}
      setIdDelivery={setIdDelivery}
      setIdPayment={setIdPayment}
      isSubmit={isSubmit}
      handleSubmit={handleSubmit}
      errorSameUser={errorSameUser}
      dateStart={dateStart}
      dateEnd={dateEnd}
      setDateStart={setDateStart}
      setDateEnd={setDateEnd}
    />
  );
}

export default RentalFormLogic;
