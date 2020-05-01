import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";

function PaymentFormLogic(props) {
  const [statusMessageForm, setStatusMessageForm] = useState("enregistrée");
  const [isSuccess, setIssuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [picture, setPicture] = useState("");
  const [errorPicture, setErrorPicture] = useState("");
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [errorForm, setErrorForm] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [method, setMethod] = useState("POST");
  const dataform = new FormData();
  const [idParams] = useState(useParams().id);
  const regexp = new RegExp(/^[\w\d\séùàüäîçïèêôö]*$/);

  useEffect(() => {
    setNumberErrorForm(0);
    if (idParams && !isFetched) {
      setMethod("PUT");
      setStatusMessageForm("modifiée");
      fetch(`http://localhost:5000/louons/api/v1/payment/${idParams}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFetched(true);
            setDescription(result.data.address);
            setTitle(result.data.title);
            setIsActive(result.data.isActive);
          }
        });
    }

    if (
      !regexp.test(title) ||
      title === "" ||
      title.length < 5 ||
      title.length > 30
    ) {
      setErrorTitle(true);
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      setErrorTitle(false);
    }

    if (
      !regexp.test(description) ||
      description === "" ||
      description.length < 10 ||
      description.length > 200
    ) {
      setErrorDescription(true);
      setNumberErrorForm((prevNumber) => prevNumber + 1);
    } else {
      setErrorDescription(false);
    }

    if (numberErrorForm > 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [idParams, numberErrorForm, regexp, title, description, isFetched]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url =
      method === "POST"
        ? `http://localhost:5000/louons/api/v1/payment`
        : `http://localhost:5000/louons/api/v1/payment/${idParams}`;

    if (!errorForm) {
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        dataform,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIssuccess(true);
            setTimeout(() => {
              setIssuccess(false);
            }, 1500);
            if (method === "POST") {
              setTitle("");
              setDescription("");
              setIsSubmit(false);
            }
          } else {
            setIsFailed(true);
            setTimeout(() => {
              setIsFailed(false);
            }, 1500);
          }
        });
    }
    setIsSubmit(true);
  };

  return (
    <PaymentForm
      titlepage={props.title}
      isFailed={isFailed}
      isSuccess={isSuccess}
      statusMessageForm={statusMessageForm}
      handleSubmit={handleSubmit}
      isActive={isActive}
      title={title}
      setTitle={setTitle}
      errorTitle={errorTitle}
      isSubmit={isSubmit}
      errorDescription={errorDescription}
      description={description}
      setDescription={setDescription}
      errorPicture={errorPicture}
      picture={picture}
      setPicture={setPicture}
    />
  );
}

export default PaymentFormLogic;
