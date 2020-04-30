import React, { useState, useEffect } from "react";
import ArticleForm from "./ArticleForm";

function ArticleFormLogic(props) {
  const [isFetched, setIsFetched] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [errorPost, setErrorPost] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [grasp, setGrasp] = useState("");
  const [owner, setOwner] = useState("");
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmit, setIsSubmit] = useState("");
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState([]);
  const [errorForm, setErrorForm] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorFile, setErrorFile] = useState(0);
  const [errorGrasp, setErrorGrasp] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const dataform = new FormData();

  useEffect(() => {
    // reset the number error of the form and the error file
    setNumberErrorForm(0);
    setErrorFile(0);

    // fetch the datas if isFetched is false, then set this to true
    // if there are not error set the category state with the result.data value

    if (!isFetched) {
      fetch("http://localhost:5000/louons/api/v1/category/all/activecategory", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setCategory(result.data);
            setIsFetched(true);
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
      for (let i = 0; i < picture.length; i++) {
        if (
          picture[i].type !== "image/png" &&
          picture[i].type !== "image/jpeg"
        ) {
          setErrorFile(true);
          setNumberErrorForm((prev) => prev + 1);
        } else {
          dataform.append(`file${i}`, picture[i]);
        }
      }
    } else {
      setErrorFile(true);
      setNumberErrorForm((prev) => prev + 1);
    }

    if (idCategory === "") {
      setErrorCategory(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorCategory(false);
    }

    if (price === 0 || typeof price === String || price > 2000 || price < 0) {
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

    if (errorGrasp) {
      setNumberErrorForm((prev) => prev + 1);
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
    isFetched,
    users,
    price,
    grasp,
    errorGrasp,
    picture,
    dataform,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // set the state isSubmit to true in order to display some error in the form

    setIsSubmit(true);

    // append the necessary data to the dataform

    dataform.append("title", title);
    dataform.append("description", description);
    dataform.append("price", price);
    dataform.append("isActive", isActive);
    dataform.append("id_user", owner);
    dataform.append("id_category", idCategory);

    // if error form is settled to false post the data to the api 
    if (!errorForm) {
      fetch(`http://localhost:5000/louons/api/v1/article`, {
        method: "POST",
        credentials: "include",
        body: dataform,
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
            setGrasp("")
            setTitle("")
            setDescription("")
            setPrice(0)
            setOwner("")
            setPicture([])
            setIdCategory("")
            setIsSubmit(false)
          } else {
            setIsFailed(true);
            setTimeout(() => setIsFailed(false), 2000);
            if(result.message === "\"id_user\" is not allowed to be empty"){
              setErrorGrasp(true)
            }
          }
        });
    }
  };

  // get the list of user depending the parameter sended by the client
  
  const getList = (occ) => {
    fetch(`http://localhost:5000/louons/api/v1/user/all/${occ}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        setIsFetched(true);
        if (!result.error) {
          setUsers(result.data);
        }
      });
  };

  return (
    <ArticleForm
      titlepage={props.title}
      isSuccess={isSuccess}
      isFailed={isFailed}
      errorPost={errorPost}
      setErrorPost={setErrorPost}
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
      users={users}
      getList={getList}
      errorGrasp={errorGrasp}
      setErrorGrasp={setErrorGrasp}
      errorPrice={errorPrice}
      setIsShow={setIsShow}
      isShow={isShow}
      setPicture={setPicture}
      isSubmit={isSubmit}
    />
  );
}

export default ArticleFormLogic;
