import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeliveryForm from "./DeliveryForm";

function DeliveryFormLogic(props) {
  const [statusMessageForm, setStatusMessageForm] = useState("enregistré");
  const [isSuccess, setIssuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [price, setPrice] = useState(0);
  const [errorPrice, setErrorPrice] = useState(false);
  const [delay, setDelay] = useState(0);
  const [errorDelay, setErrorDelay] = useState(false);
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
  const regexp = new RegExp(/^[\w\d\séùàüäîçïèêôö/-_]*$/);

  useEffect(() => {
    // initialize the number of error form

    setNumberErrorForm(0);

    // get the data depending if the isFetched state is settled to false and if there are an idParams

    if (idParams && !isFetched) {
      setMethod("PUT");
      setStatusMessageForm("modifié");
      fetch(`http://localhost:5000/louons/api/v1/carrier/detail/${idParams}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFetched(true);
            setDescription(result.data.description);
            setTitle(result.data.title);
            setPrice(result.data.price);
            setDelay(result.data.delay_delivery);
            setIsActive(result.data.isActive);
            setPictureDisplay(result.data.path_picture);
          } else if (result.error) {
            return props.history.push("/admin/deliveries");
          }
        });
    }

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

    if (
      price === "" ||
      typeof price === String ||
      price > 500 ||
      price < 0
    ) {
      setErrorPrice(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorPrice(false);
    }

    if (
      delay === 0 ||
      delay === "" ||
      typeof delay === String ||
      delay > 10 ||
      delay < 0
    ) {
      setErrorDelay(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorDelay(false);
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
    delay,
    price,
    props.history,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // set the state isSubmit to true in order to display some error in the form

    setIsSubmit(true);

    // append the necessary data to the dataform

    dataform.append("title", title);
    dataform.append("description", description);
    dataform.append("price", price);
    dataform.append("delay_delivery", delay);
    dataform.append("isActive", isActive);

    const url =
      method === "POST"
        ? "http://localhost:5000/louons/api/v1/carrier"
        : `http://localhost:5000/louons/api/v1/carrier/${idParams}`;

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
              setPrice(0);
              setDelay(0);
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
    <DeliveryForm
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
      price={price}
      setPrice={setPrice}
      errorPrice={errorPrice}
      delay={delay}
      setDelay={setDelay}
      errorDelay={errorDelay}
    />
  );
}

export default DeliveryFormLogic;
