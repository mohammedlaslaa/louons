import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import Api from "../../../Classes/Api/Api";

function PaymentFormLogic(props) {
  const [statusMessageForm, setStatusMessageForm] = useState("enregistré");
  const [isSuccess, setIssuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [picture, setPicture] = useState("");
  const [errorPicture, setErrorPicture] = useState("");
  const [pictureDisplay, setPictureDisplay] = useState("");
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [errorForm, setErrorForm] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [method, setMethod] = useState("POST");
  const dataform = new FormData();
  const [idParams] = useState(useParams().id);
  const regexp = new RegExp(/^[\w\d\séùàüäîçïèêôö]*$/);
  const ApiLink = Api.endPoint;

  useEffect(() => {
    // initialize the number of error form

    setNumberErrorForm(0);

    // get the data depending if the isFetched state is settled to false and if there are an idParams

    if (idParams && !isFetched) {
      setMethod("PUT");
      setStatusMessageForm("modifié");
      fetch(`${ApiLink}/payment/detail/${idParams}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFetched(true);
            setDescription(result.data.description);
            setTitle(result.data.title);
            setIsActive(result.data.isActive);
            setPictureDisplay(result.data.path_picture);
          } else if (result.error) {
            return props.history.push("/admin/payments");
          }
        });
    }

    // condition to display some error in the form

    if (
      !regexp.test(title) ||
      title === "" ||
      title.length < 3 ||
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

    if (Object.keys(picture).length === 1) {
      for (let i = 0; i < picture.length; i++) {
        if (
          picture[i].type !== "image/png" &&
          picture[i].type !== "image/jpeg"
        ) {
          setErrorPicture(true);
          setNumberErrorForm((prev) => prev + 1);
        } else {
          setErrorPicture(false);
          dataform.append(`file${i}`, picture[i]);
        }
      }
    } else if (method === "POST" && !idParams) {
      setErrorPicture(true);
      setNumberErrorForm((prev) => prev + 1);
    }

    if (numberErrorForm > 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [
    idParams,
    numberErrorForm,
    regexp,
    title,
    description,
    isFetched,
    dataform,
    method,
    picture,
    props.history,
    ApiLink
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // set the state isSubmit to true in order to display some error in the form

    setIsSubmit(true);

    // append the necessary data to the dataform

    dataform.append("title", title);
    dataform.append("description", description);
    dataform.append("isActive", isActive);

    const url =
      method === "POST"
        ? `${ApiLink}/payment`
        : `${ApiLink}/payment/${idParams}`;

    if (!errorForm) {
      fetch(url, {
        method,
        credentials: "include",
        body: dataform,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIssuccess(true);
            setTimeout(() => {
              setIssuccess(false);
            }, 1500);
            setPicture("");
            if (method === "POST") {
              setTitle("");
              setDescription("");
              setIsSubmit(false);
              setIsActive(false);
            } else if (result.picture) {
              setPictureDisplay(result.picture);
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
    <PaymentForm
      titlepage={props.title}
      isFailed={isFailed}
      isSuccess={isSuccess}
      statusMessageForm={statusMessageForm}
      handleSubmit={handleSubmit}
      isActive={isActive}
      setIsActive={setIsActive}
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
      pictureDisplay={pictureDisplay}
    />
  );
}

export default PaymentFormLogic;
