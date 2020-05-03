import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AdminForm from "./AdminForm";
import { AuthContext } from "../../../context/AuthContext";

function AdminFormLogic(props) {
  const [method, setMethod] = useState("POST");
  const [picture, setPicture] = useState("");
  const [gender, setGender] = useState("mr");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateBirth, setDateBirth] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLevel, setAdminLevel] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [pictureDisplay, setPictureDisplay] = useState("");
  const [errorForm, setErrorForm] = useState(false);
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmation, setErrorConfirmation] = useState(false);
  const [errorAdminLevel, setErrorAdminLevel] = useState(false);
  const [errorPicture, setErrorPicture] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const { dataUser } = useContext(AuthContext);
  const idParams =useParams().id || dataUser._id;
  const dataform = new FormData();

  useEffect(() => {
    setErrorForm(false);
    // if the method is not equal to true and there are an idparams, fetch the data to the api and set the state

    if ((idParams) && method !== "PUT") {
      setMethod("PUT");
      fetch(`http://localhost:5000/louons/api/v1/admin/${idParams}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            setGender(result.gender.toLowerCase());
            setAdminLevel(result.adminLevel);
            setLastName(result.lastName);
            setFirstName(result.firstName);
            setDateBirth(result.date_birth);
            setEmail(result.email);
            setPictureDisplay(result.path_picture);
          }
        });
    }

    setNumberErrorForm(0);

    // initialize the regex

    const regexName = new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/);
    const regexMail = new RegExp(
      /^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/
    );
    const regexPassword = new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,./{}|:<>?~]).{8,20})/
    );

    // set the error depending the value of the fields

    if (!regexName.test(lastName) || lastName === "") {
      setErrorLastName(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorLastName(false);
    }

    if (!regexName.test(firstName) || firstName === "") {
      setErrorFirstName(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorFirstName(false);
    }

    if (!regexMail.test(email) || email === "") {
      setErrorMail(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorMail(false);
    }

    if (
      (!regexPassword.test(password) && password !== "") ||
      (password === "" && method === "POST")
    ) {
      setErrorPassword(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorPassword(false);
    }

    if (
      confirmationPassword !== password ||
      (confirmationPassword === "" && method === "POST")
    ) {
      setErrorConfirmation(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorConfirmation(false);
    }

    if (adminLevel !== "superadmin" && adminLevel !== "admin") {
      setErrorAdminLevel(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorAdminLevel(false);
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
    } else if (Object.keys(picture).length > 1) {
      setErrorPicture(true);
      setNumberErrorForm((prev) => prev + 1);
    }

    if (numberErrorForm > 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [
    numberErrorForm,
    lastName,
    firstName,
    email,
    password,
    confirmationPassword,
    idParams,
    method,
    adminLevel,
    errorAdminLevel,
    dataform,
    picture,
    pictureDisplay
  ]);

  const handleSubmit = (e) => {
    e.preventDefault(e);
    setIsSubmit(true);

    // append the different state to the dataform depending the value of the password and the method

    dataform.append("gender", gender);
    dataform.append("lastName", lastName);
    dataform.append("firstName", firstName);
    dataform.append("date_birth", dateBirth);
    dataform.append("adminLevel", adminLevel);
    dataform.append("email", email);
    password !== "" && dataform.append("password", password);

    // adapt the link according to the method
    const getLink =
      method === "POST"
        ? "http://localhost:5000/louons/api/v1/admin"
        : `http://localhost:5000/louons/api/v1/admin/${idParams}`;

    // fetch only if there are not errorform

    if (!errorForm) {
      fetch(getLink, {
        method: method,
        credentials: "include",
        body: dataform,
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            // set issuccess to true if there are not error
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 1500);
            if (method === "POST") {
              // reset all value of the form if the value method is equal to POST
              setLastName("");
              setFirstName("");
              setDateBirth("");
              setEmail("");
              setPassword("");
              setConfirmationPassword("");
              setAdminLevel("");
            } else {
              console.log(result)
              setPictureDisplay(result.picture);
              setPassword("");
              setConfirmationPassword("");
            }
            setIsSubmit(false);
          } else if (result.error) {
            // set isfailed to false if there are an error
            setIsFailed(true);
            setTimeout(() => {
              setIsFailed(false);
            }, 1500);
          }
        });
    }
  };

  // function that set either the lastname or the firstname
  const handleName = (e) => {
    if (e.target.name === "lastname") {
      setLastName(e.target.value);
    } else {
      setFirstName(e.target.value);
    }
  };

  return (
    <AdminForm
      isSuccess={isSuccess}
      isFailed={isFailed}
      handleSubmit={handleSubmit}
      gender={gender}
      lastName={lastName}
      firstName={firstName}
      dateBirth={dateBirth}
      email={email}
      password={password}
      confirmationPassword={confirmationPassword}
      setDateBirth={setDateBirth}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmationPassword={setConfirmationPassword}
      setGender={setGender}
      handleName={handleName}
      errorLastName={errorLastName}
      errorFirstName={errorFirstName}
      errorMail={errorMail}
      errorPassword={errorPassword}
      errorConfirmation={errorConfirmation}
      titlepage={props.title}
      isSubmit={isSubmit}
      method={method}
      adminLevel={adminLevel}
      errorAdminLevel={errorAdminLevel}
      setAdminLevel={setAdminLevel}
      setPicture={setPicture}
      errorPicture={errorPicture}
      pictureDisplay={pictureDisplay}
      setPictureDisplay={setPictureDisplay}
    />
  );
}

export default AdminFormLogic;
