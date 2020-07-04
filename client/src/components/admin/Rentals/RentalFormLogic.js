import React, { useState, useEffect } from "react";
import RentalForm from "./RentalForm";
import { useParams } from "react-router-dom";
import Api from "../../../Classes/Api/Api";

function RentalFormLogic(props) {
  const ApiLink = Api.endPoint;
  const [method, setMethod] = useState("POST");
  const [isActive, setIsActive] = useState(false);
  const [isSuccess, setIssuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [listDate, setListDate] = useState([]);
  const [numberListDate, setNumberListDate] = useState(0);
  const [statusMessageForm, setStatusMessageForm] = useState("enregistré");
  const [graspArticle, setGraspArticle] = useState("");
  const [graspTenant, setGraspTenant] = useState("");
  const [idTenant, setIdTenant] = useState("");
  const [idOwnerArticle, setIdOwnerArticle] = useState("");
  const [owner, setOwner] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveries, setDeliveries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [idArticle, setIdArticle] = useState("");
  const [idDelivery, setIdDelivery] = useState("");
  const [idPayment, setIdPayment] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [errorDate, setErrorDate] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorSameUser, setErrorSameUser] = useState(false);
  const [errorGraspArticle, setErrorGraspArticle] = useState(false);
  const [errorGraspTenant, setErrorGraspTenant] = useState(false);
  const [errorDelivery, setErrorDelivery] = useState(false);
  const [errorPayment, setErrorPayment] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [errorNumberListDate, setErrorNumberListDate] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [isFetchedDeliveries, setIsFetchedDeliveries] = useState(false);
  const [isFetchedPayments, setIsFetchedPayments] = useState(false);
  const [isFetchedRental, setIsFetchedRental] = useState(false);
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

    if (!idParams) {
      setIsIdValid(true);
    }

    // get the owner of the article when the article is settled

    if (idArticle && isIdValid) {
      fetch(`${ApiLink}/article/detail/${idArticle}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setPricePerDay(result.data.price);
            setIdOwnerArticle(result.data.id_user._id);
            setOwner(
              `${result.data.id_user.lastName} ${result.data.id_user.firstName}`
            );
          }
        });
    }

    if (idArticle && numberListDate > 0 && method === "POST" && isIdValid) {
      fetch(
        `${ApiLink}/rental/date/${idArticle}/${numberListDate}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setListDate(result.data);
          }
        })
        .catch((e) => console.log(e));
    }

    // fetch the datas if isFetched is false, then set this to true
    // if there are not error set the category state with the result.data value

    if (!isFetchedDeliveries && isIdValid) {
      fetch(`${ApiLink}/carrier/all/activecarrier`, {
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

    if (!isFetchedPayments && isIdValid) {
      fetch(`${ApiLink}/payment/all/activepayment`, {
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

    // fetch the data only if there an idparams and isfetchedrental is settled to false

    if (idParams && !isFetchedRental) {
      setMethod("PUT");
      fetch(`${ApiLink}/rental/detail/${idParams}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFetchedRental(true);
            setIdArticle(result.data.id_article._id);
            setIdTenant(result.data.id_user._id);
            setGraspTenant(
              `${result.data.id_user.clientId} ${result.data.id_user.lastName} ${result.data.id_user.firstName}`
            );
            setPricePerDay(result.data.id_article.price);
            setTotalPrice(result.data.total_price);
            setIdDelivery(result.data.id_carrier._id);
            setIdPayment(result.data.id_payment._id);
            setGraspArticle(result.data.id_article.title);
            setIsActive(result.data.isActive);
            setDateStart(result.data.start_date);
            setDateEnd(result.data.end_date);
            setIsIdValid(true);
          } else if (result.error) {
            return props.history.push("/admin/rentals");
          }
        });
    }

    // condition to display some error in the form or initialize some values

    if (graspArticle === "") {
      setOwner("");
    }

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

    if ((dateStart === "" || dateEnd === "") && method === "POST") {
      setErrorDate(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorDate(false);
    }

    if (
      (numberListDate === 0 ||
        numberListDate === "" ||
        typeof numberListDate === String ||
        numberListDate < 0) &&
      !idParams
    ) {
      setListDate([]);
      setTotalPrice(0);
      setErrorNumberListDate(true);
      setNumberErrorForm((prev) => prev + 1);
    } else if (numberListDate && graspArticle) {
      setTotalPrice(pricePerDay * numberListDate);
      setErrorNumberListDate(false);
    } else {
      setErrorNumberListDate(false);
    }

    if (numberErrorForm > 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [
    idArticle,
    isIdValid,
    isFetchedDeliveries,
    isFetchedPayments,
    idDelivery,
    numberListDate,
    idOwnerArticle,
    idTenant,
    idPayment,
    dateStart,
    dateEnd,
    numberErrorForm,
    graspTenant,
    graspArticle,
    idParams,
    method,
    isFetchedRental,
    pricePerDay,
    props.history,
    ApiLink
  ]);

  // reset the date start, date end and the list data when this function is called

  const resetFields = () => {
    setDateEnd("");
    setDateStart("");
    setListDate([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // set the state isSubmit to true in order to display some error in the form

    setIsSubmit(true);

    const url =
      method === "POST"
        ? `${ApiLink}/rental`
        : `${ApiLink}/rental/${idParams}`;

    const data =
      method === "PUT"
        ? JSON.stringify({
          id_payment: idPayment,
          id_carrier: idDelivery,
          total_price: totalPrice,
          isActive,
        })
        : JSON.stringify({
          id_payment: idPayment,
          id_carrier: idDelivery,
          id_article: idArticle,
          id_user: idTenant,
          total_price: totalPrice,
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
              setListDate([]);
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
              setPricePerDay(0);
              setTotalPrice(0);
              setNumberListDate(0);
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
      setDateStart={setDateStart}
      setDateEnd={setDateEnd}
      listDate={listDate}
      reset={resetFields}
      setNumberListDate={setNumberListDate}
      numberListDate={numberListDate}
      errorNumberListDate={errorNumberListDate}
      errorDate={errorDate}
      pricePerDay={pricePerDay}
      isActive={isActive}
      setIsActive={setIsActive}
      dateStart={dateStart}
      dateEnd={dateEnd}
    />
  );
}

export default RentalFormLogic;
