import React, { useState, useEffect, useContext } from "react";
import CategoryForm from "./CategoryForm";
import { useParams } from "react-router-dom";
import { PopupAddContext } from "../../../context/PopupAddContext";

function CategoryFormLogic() {
  const [method, setMethod] = useState("GET");
  const [isActive, setIsActive] = useState(false);
  const [dateRegister, setDateRegister] = useState("");
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [link, setLink] = useState("");
  const [errorLink, setErrorLink] = useState(false);
  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const idParams = useParams().id;
  const stringRegex = new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/);
  const linkRegex = new RegExp(/^[a-zA-Z-]+$/);
  const PopupContext = useContext(PopupAddContext);

  // fetch the data to the api at the first loading

  useEffect(() => {

    // initialize the value method and the number of error form

    setMethod("PUT");
    setNumberErrorForm(0);

    // fetch the data depending if the method state is settled to 'GET' and if there are an idParams

    if (method === "GET" && idParams) {
      fetch(`http://localhost:5000/louons/api/v1/category/${idParams}`, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setTitle(result.data.title);
            setLink(result.data.link);
            setDescription(result.data.description);
            setIsActive(result.data.isActive);
            setDateRegister(result.data.date_register);
          }
        });
    }

    // condition to display some error in the form

    if (!stringRegex.test(title) && title !== "") {
      setErrorTitle(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorTitle(false);
    }

    if (!linkRegex.test(link) && link !== "") {
      setErrorLink(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorLink(false);
    }

    if (
      description !== "" &&
      (description.length < 10 || description.length > 150)
    ) {
      setErrorDescription(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorDescription(false);
    }
    if (numberErrorForm > 0) {
      setErrorForm(true);
    }else{
      setErrorForm(false)
    }
  }, [
    idParams,
    title,
    link,
    description,
    method,
    stringRegex,
    linkRegex,
    numberErrorForm,
    errorPost,
  ]);

  // if the form is submitted call the handleFetchPut function

  const handleSubmit = (e) => {
    e.preventDefault();
    PopupContext.isToggle ? handleFetchPost() : handleFetchPut();
  };

  // send fetch put method depending the argument passed in function

  const handleFetchPut = (arg = "") => {
    const dataForm =
      arg === "isActive"
        ? JSON.stringify({
            isActive: !isActive,
          })
        : JSON.stringify({
            title,
            description,
            link,
          });
    if (!errorForm || (arg === "isActive" && idParams)) {
      fetch(`http://localhost:5000/louons/api/v1/category/${idParams}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataForm,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 1500);
            if (arg === "isActive") {
              setIsActive(!isActive);
            }
          } else {
            setIsFailed(true);
            setTimeout(() => {
              setIsFailed(false);
            }, 1500);
          }
        });
    } else if (arg === "isActive" && !idParams) {
      setIsActive(!isActive);
    }
  };

  // send fetch post method to create a new category

  const handleFetchPost = () => {
    const dataForm = JSON.stringify({
      title,
      description,
      link,
      isActive,
    });

    // if the description the title or the link are empty set the errorpost state to true, else if there are no error, send the data form to the api

    if (description === "" || title === "" || link === "") {
      setErrorPost(true);
    } else if (!errorForm) {
      fetch(`http://localhost:5000/louons/api/v1/category`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataForm,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setTitle("");
            setLink("");
            setDescription("");
            PopupContext.setToggle(false);
            setRedirect(true);
          } else {
            setErrorPost(true);
          }
        });
    }
  };

  return (
    <CategoryForm
      description={description}
      setDescription={setDescription}
      title={title}
      setTitle={setTitle}
      handleSubmit={handleSubmit}
      handleFetchPut={handleFetchPut}
      link={link}
      setLink={setLink}
      isActive={isActive}
      setIsActive={setIsActive}
      dateRegister={dateRegister}
      idParams={idParams}
      isSuccess={isSuccess}
      isFailed={isFailed}
      errorTitle={errorTitle}
      errorLink={errorLink}
      errorDescription={errorDescription}
      errorPost={errorPost}
      setErrorPost={setErrorPost}
      redirect={redirect}
    />
  );
}

export default CategoryFormLogic;
