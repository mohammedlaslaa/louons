import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddUserForm from "./UserForm";

function AddUser(props) {
  const [method, setMethod] = useState("POST");
  const [fetchPut, setFetchPut] = useState(false);
  const [gender, setGender] = useState("mr");
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dateBirth, setDateBirth] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorForm, setErrorForm] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmation, setErrorConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [idParams] = useState(useParams().id);

  const dataForm =
    password === "" && method === "PUT"
      ? JSON.stringify({
          gender,
          lastName,
          firstName,
          date_birth: dateBirth,
          email,
          isSubscribe
        })
      : JSON.stringify({
        gender,
        lastName,
        firstName,
        date_birth: dateBirth,
        email,
        password,
        isSubscribe
      });

  const handleSubmit = (e) => {
    e.preventDefault(e);
    const getLink =
      method === "POST"
        ? "http://localhost:5000/louons/api/v1/user"
        : `http://localhost:5000/louons/api/v1/user/${idParams}`;

    if (!errorForm) {
      fetch(getLink, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataForm,
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            handleIsSuccess();
            if (method === "POST") {
              setGender("");
              setLastName("");
              setFirstName("");
              setDateBirth("");
              setEmail("");
              setPassword("");
              setIsSubscribe(false)
            }
          } else if (result.error) {
            handleFailed();
          }
        });
    }
  };

  const handleName = (e) => {
    if (e.target.name === "lastname") {
      setLastName(e.target.value);
    } else {
      setFirstName(e.target.value);
    }
  };

  useEffect(() => {
    if (idParams && !fetchPut) {
      setFetchPut(true);
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
          }
        });
    }

    const regexName = new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/);
    const regexMail = new RegExp(
      /^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/
    );
    const regexPassword = new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,./{}|:<>?~]).{8,20})/
    );

    if (!regexName.test(lastName) && lastName !== "") {
      setErrorLastName(true);
      setErrorForm(true);
    } else {
      setErrorLastName(false);
      setErrorForm(false);
    }

    if (!regexName.test(firstName) && firstName !== "") {
      setErrorFirstName(true);
      setErrorForm(true);
    } else {
      setErrorFirstName(false);
      setErrorForm(false);
    }

    if (!regexMail.test(email) && email !== "") {
      setErrorMail(true);
      setErrorForm(true);
    } else {
      setErrorMail(false);
      setErrorForm(false);
    }

    if (!regexPassword.test(password) && password !== "" ) {
      setErrorPassword(true);
      setErrorForm(true);
    } else {
      setErrorPassword(false);
      setErrorForm(false);
    }

    if (
      confirmationPassword !== password  &&
      password !== ""
    ) {
      setErrorConfirmation(true);
      setErrorForm(true);
    } else {
      setErrorConfirmation(false);
      setErrorForm(false);
    }
  }, [
    lastName,
    firstName,
    email,
    password,
    confirmationPassword,
    idParams,
    fetchPut
  ]);

  const handleIsSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1500);
  };

  const handleFailed = () => {
    setIsFailed(true);
    setTimeout(() => {
      setIsFailed(false);
    }, 1500);
  };

  return (
    <AddUserForm
      isSuccess={isSuccess}
      isFailed={isFailed}
      handleSubmit={handleSubmit}
      gender={gender}
      lastName={lastName}
      firstName={firstName}
      dateBirth={dateBirth}
      email={email}
      password={password}
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
      title={props.title}
    />
  );
}

export default AddUser;
