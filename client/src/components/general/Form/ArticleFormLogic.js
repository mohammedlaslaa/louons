import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleForm from "./ArticleForm";

function ArticleFormLogic(props) {
  const [method, setMethod] = useState("POST");
  const [isFetchedCategory, setIsFetchedCategory] = useState(false);
  const [isFetchedArticle, setIsFetchedArticle] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [grasp, setGrasp] = useState("");
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmit, setIsSubmit] = useState("");
  const [price, setPrice] = useState(0);
  const [pictureDisplay, setPictureDisplay] = useState([]);
  const [picture, setPicture] = useState("");
  const [errorForm, setErrorForm] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [errorGrasp, setErrorGrasp] = useState(true);
  const [statusMessageForm, setStatusMessageForm] = useState("enregistré");
  const dataform = new FormData();
  const [idParams] = useState(useParams().id);

  useEffect(() => {
    // reset the number error of the form and the error file

    setNumberErrorForm(0);

    // get the data depending if the isFetched state is settled to false and if there are an idParams
    if (idParams && !isFetchedArticle) {
      setMethod("PUT");
      setStatusMessageForm("modifié");
      fetch(`http://localhost:5000/louons/api/v1/article/detail/${idParams}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsFetchedArticle(true);
            setIdCategory(result.data.id_category._id);
            setPrice(result.data.price);
            setTitle(result.data.title);
            setDescription(result.data.description);
            setGrasp(`${result.data.id_user.lastName} ${result.data.id_user.firstName}`);
            setPictureDisplay(result.data.pictures);
            setIsActive(result.data.isActive);
            setErrorGrasp(false);
          } else if (result.error) {
            return props.history.push("/admin/articles");
          }
        });
    }

    // fetch the datas if isFetched is settled to false, then set it to true
    // if there are not error set the category state with the result.data value

    if (
      (method === "POST" && !isFetchedCategory && !idParams) ||
      (method === "PUT" && isFetchedArticle && !isFetchedCategory)
    ) {
      fetch("http://localhost:5000/louons/api/v1/category/all/activecategory", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setCategory(result.data);
            setIsFetchedCategory(true);
          }
        });
    }
    // condition to display some error in the form

    if (title.length < 3 || title.length > 30) {
      setErrorTitle(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorTitle(false);
    }

    if (Object.keys(picture).length === 3) {
      let countError = 0;
      for (let i = 0; i < picture.length; i++) {
        if (
          picture[i].type !== "image/png" &&
          picture[i].type !== "image/jpeg"
        ) {
          countError++;
          setNumberErrorForm((prev) => prev + 1);
        } else {
          dataform.append(`file${i}`, picture[i]);
        }
      }
      if (countError > 0) {
        setErrorFile(true);
      } else {
        setErrorFile(false);
      }
    } else if (method === "POST" && !idParams) {
      setErrorFile(true);
      setNumberErrorForm((prev) => prev + 1);
    }

    if (errorGrasp) {
      setNumberErrorForm((prev) => prev + 1);
    }

    if (idCategory === "") {
      setErrorCategory(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorCategory(false);
    }

    if (
      price === 0 ||
      price === "" ||
      typeof price === String ||
      price > 2000 ||
      price < 0
    ) {
      setErrorPrice(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorPrice(false);
    }

    if (description.length < 10 || description.length > 150) {
      setErrorDescription(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorDescription(false);
    }

    if (numberErrorForm > 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [
    title,
    description,
    idCategory,
    numberErrorForm,
    isFetchedCategory,
    price,
    grasp,
    isSubmit,
    errorGrasp,
    picture,
    dataform,
    idParams,
    isFetchedArticle,
    errorFile,
    method,
    props.history,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url =
      method === "POST"
        ? "http://localhost:5000/louons/api/v1/article"
        : `http://localhost:5000/louons/api/v1/article/${idParams}`;

    // set the state isSubmit to true in order to display some error in the form

    setIsSubmit(true);

    // append the necessary data to the dataform

    dataform.append("title", title);
    dataform.append("description", description);
    dataform.append("price", price);
    dataform.append("isActive", isActive);
    method === "POST" && dataform.append("id_user", owner);
    dataform.append("id_category", idCategory);

    // if error form is settled to false post the data to the api

    if (!errorForm) {
      fetch(url, {
        method: method,
        credentials: "include",
        body: dataform,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 2000);
            if (method === "POST") {
              setGrasp("");
              setTitle("");
              setDescription("");
              setPrice(0);
              setOwner("");
              setPicture("");
              setIdCategory("");
              setIsSubmit(false);
            } else {
              if (result.pictures) {
                setPictureDisplay(result.pictures);
              }
            }
          } else {
            setIsFailed(true);
            setTimeout(() => setIsFailed(false), 2000);
            if (result.message === '"id_user" is not allowed to be empty') {
              setErrorGrasp(true);
            }
          }
        });
    }
  };

  return (
    <ArticleForm
      titlepage={props.title || "Proposer"}
      isSuccess={isSuccess}
      isFailed={isFailed}
      isActive={isActive}
      setIsActive={setIsActive}
      grasp={grasp}
      setGrasp={setGrasp}
      owner={owner}
      setOwner={setOwner}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      errorDescription={errorDescription}
      idCategory={idCategory}
      setIdCategory={setIdCategory}
      price={price}
      category={category}
      setPrice={setPrice}
      handleSubmit={handleSubmit}
      errorTitle={errorTitle}
      errorCategory={errorCategory}
      errorFile={errorFile}
      errorGrasp={errorGrasp}
      setErrorGrasp={setErrorGrasp}
      errorPrice={errorPrice}
      setPicture={setPicture}
      isSubmit={isSubmit}
      pictureDisplay={pictureDisplay}
      idParams={idParams}
      statusMessageForm={statusMessageForm}
    />
  );
}

export default ArticleFormLogic;
