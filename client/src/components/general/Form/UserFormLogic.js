import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";

function UserFormLogic(props) {
  const [method, setMethod] = useState("POST");
  const [gender, setGender] = useState("mr");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateBirth, setDateBirth] = useState();
  const [errorDateBirth, setErrorDateBirth] = useState(false);
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureDisplay, setPictureDisplay] = useState("");
  const [errorPicture, setErrorPicture] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorForm, setErrorForm] = useState(false);
  const [numberErrorForm, setNumberErrorForm] = useState(0);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmation, setErrorConfirmation] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [idParams] = useState(useParams().id);
  const dataform = new FormData();

  useEffect(() => {
    setErrorForm(false);
    // if the method is not equal to true and there are an idparams, fetch the data to the api and set the state
    if (idParams && method !== "PUT") {
      setMethod("PUT");
      fetch(`http://localhost:5000/louons/api/v1/user/${idParams}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            setGender(result.gender.toLowerCase());
            setLastName(result.lastName);
            setFirstName(result.firstName);
            setDateBirth(result.date_birth);
            setEmail(result.email);
            setIsSubscribe(result.isSubscribe);
            setPictureDisplay(result.path_picture);
          } else if (result.error) {
            return props.history.push("/admin/users");
          }
        });
    }

    setNumberErrorForm(0);

    // initialize the regex

    const regexName = new RegExp(/^[a-zA-Z\séùàüäîçïèêôö-]+$/);
    const regexMail = new RegExp(
      /^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/
    );
    const regexPassword = new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,./{}|:<>?~]).{8,20})/
    );

    // set the error depending the value of the fields

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
    
    if (!dateBirth  && method === "POST") {
      setErrorDateBirth(true);
      setNumberErrorForm((prev) => prev + 1);
    } else {
      setErrorDateBirth(false);
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
    dataform,
    dateBirth,
    picture,
    props.history,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault(e);
    setIsSubmit(true);

    // append the different state to the dataform depending the value of the password and the method

    dataform.append("gender", gender);
    dataform.append("lastName", lastName);
    dataform.append("firstName", firstName);
    dataform.append("date_birth", dateBirth);
    dataform.append("email", email);
    dataform.append("isSubscribe", isSubscribe);
    password !== "" && dataform.append("password", password);

    // adapt the link according to the method

    const getLink =
      method === "POST"
        ? "http://localhost:5000/louons/api/v1/user"
        : `http://localhost:5000/louons/api/v1/user/${idParams}`;

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
            if (props.location.pathname === "/inscription") {
              setTimeout(() => {
                return props.history.push("/login");
              }, 2000);
            }
            if (method === "POST") {
              // reset all value of the form if the value method is equal to POST
              setGender("");
              setLastName("");
              setFirstName("");
              setDateBirth("");
              setEmail("");
              setPassword("");
              setConfirmationPassword("");
              setPicture("");
              setIsSubscribe(false);
              //redirect to login when the user subscribe
            } else {
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
    <UserForm
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
      isSubscribe={isSubscribe}
      setIsSubscribe={setIsSubscribe}
      titlepage={props.title}
      isSubmit={isSubmit}
      method={method}
      picture={picture}
      setPicture={setPicture}
      errorPicture={errorPicture}
      pictureDisplay={pictureDisplay}
      setPictureDisplay={setPictureDisplay}
      pathname={props.location.pathname}
      errorDateBirth={errorDateBirth}
    />
  );
}

export default UserFormLogic;
