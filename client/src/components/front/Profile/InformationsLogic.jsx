import React, { useState, useEffect } from "react";
import Informations from "./Informations";
import Api from '../../../Classes/Api/Api.js';

function InformationsLogic(props) {
  // Initialize the state with the data of the current user
  const ApiLink = Api.endPoint;
  const [dataCurrentUser, setDataCurrentUser] = useState({
    method: "GET",
    data: {
      date_birth: "",
      picture: [],
      testPassword: "",
      confirmationTestPassword: "",
      newPassword: "",
      confirmationNewPassword: "",
    },
    isFetched: false,
    isLoading: true,
    isSubmit: false,
    isDisabledForm: true,
    numberErrorForm: 0,
    errorForm: false,
    errorPicture: false,
    errorDate: false,
    errorLastName: false,
    errorFirstName: false,
    errorMail: false,
    errorTestPassword: false,
    errorConfirmationTestPassword: false,
    errorNewPassword: false,
    errorConfirmationNewPassword: false,
    isSuccess: false,
    isFailed: false,
  });
  const dataform = new FormData();

  const {
    lastName,
    firstName,
    date_birth,
    gender,
    email,
    isSubscribe,
    picture,
    testPassword,
    confirmationTestPassword,
    newPassword,
    confirmationNewPassword,
  } = dataCurrentUser.data;

  const {
    method,
    isFetched,
    errorForm,
    errorPicture,
    errorDate,
    errorLastName,
    errorFirstName,
    errorMail,
    errorTestPassword,
    errorConfirmationTestPassword,
    errorNewPassword,
    errorConfirmationNewPassword,
  } = dataCurrentUser;

  // initialize the regex

  const regexName = new RegExp(/^[a-zA-Z\séùàüäîçïèêôö-]+$/);
  const regexMail = new RegExp(
    /^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/
  );
  const regexPassword = new RegExp(
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,./{}|:<>?~]).{8,20})/
  );

  useEffect(() => {
    // fetch the users information from the api

    if (!isFetched) {
      fetch(`${ApiLink}/user/me`, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            setDataCurrentUser((prevState) => ({
              ...prevState,
              data: { ...prevState.data, ...result.data },
              isFetched: true,
              isLoading: false,
            }));
          }
        });
    }

    if (isFetched && method === "PUT") {
      // Add picture and test the type mime
      if (Object.keys(picture).length === 1) {
        for (let i = 0; i < picture.length; i++) {
          if (
            picture[i].type !== "image/png" &&
            picture[i].type !== "image/jpeg" &&
            !errorPicture
          ) {
            setDataCurrentUser((prevState) => ({
              ...prevState,
              errorPicture: true,
            }));
          } else if (
            picture[i].type === "image/png" ||
            picture[i].type === "image/jpeg"
          ) {
            if (errorPicture) {
              setDataCurrentUser((prevState) => ({
                ...prevState,
                errorPicture: false,
              }));
            }
            dataform.append(`file${i}`, picture[i]);
          }
        }
      } else if (Object.keys(picture).length > 1 && !errorPicture) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorPicture: true,
        }));
      }

      // set the error depending the value of the fields
      if (
        (new Date(date_birth).getFullYear() < 1940 ||
          new Date(date_birth).getFullYear() > 2010) &&
        !errorDate
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorDate: true,
        }));
      } else if (
        new Date(date_birth).getFullYear() > 1940 &&
        new Date(date_birth).getFullYear() < 2010 &&
        errorDate
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorDate: false,
        }));
      }

      if (regexName.test(lastName) && lastName !== "" && errorLastName) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorLastName: false,
        }));
      } else if (
        (!regexName.test(lastName) || lastName === "") &&
        !errorLastName
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorLastName: true,
        }));
      }

      if (regexName.test(firstName) && firstName !== "" && errorFirstName) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorFirstName: false,
        }));
      } else if (!regexName.test(firstName) && !errorFirstName) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorFirstName: true,
        }));
      }

      if (regexMail.test(email) && email !== "" && errorMail) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorMail: false,
        }));
      } else if (!regexMail.test(email) && !errorMail) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorMail: true,
        }));
      }

      if (
        regexPassword.test(testPassword) &&
        testPassword !== "" &&
        errorTestPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorTestPassword: false,
        }));
      } else if (
        (!regexPassword.test(testPassword) || testPassword === "") &&
        !errorTestPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorTestPassword: true,
        }));
      }

      if (
        testPassword === confirmationTestPassword &&
        errorConfirmationTestPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorConfirmationTestPassword: false,
        }));
      } else if (
        testPassword !== confirmationTestPassword &&
        !errorConfirmationTestPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorConfirmationTestPassword: true,
        }));
      }

      if (
        (newPassword === "" || regexPassword.test(newPassword)) &&
        errorNewPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorNewPassword: false,
        }));
      } else if (
        newPassword !== "" &&
        !regexPassword.test(newPassword) &&
        !errorNewPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorNewPassword: true,
        }));
      }

      if (
        newPassword === confirmationNewPassword &&
        errorConfirmationNewPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorConfirmationNewPassword: false,
        }));
      } else if (
        newPassword !== confirmationNewPassword &&
        !errorConfirmationNewPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorConfirmationNewPassword: true,
        }));
      }

      if (
        (errorPicture ||
          errorDate ||
          errorLastName ||
          errorFirstName ||
          errorMail ||
          errorTestPassword ||
          errorConfirmationTestPassword ||
          errorNewPassword ||
          errorConfirmationNewPassword) &&
        !errorForm
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorForm: true,
        }));
      } else if (
        errorForm &&
        !errorPicture &&
        !errorDate &&
        !errorLastName &&
        !errorFirstName &&
        !errorMail &&
        !errorTestPassword &&
        !errorConfirmationTestPassword &&
        !errorNewPassword &&
        !errorConfirmationNewPassword
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorForm: false,
        }));
      }
    }
  }, [
    method,
    isFetched,
    regexMail,
    regexName,
    regexPassword,
    dataform,
    lastName,
    firstName,
    date_birth,
    email,
    picture,
    testPassword,
    confirmationTestPassword,
    errorForm,
    errorPicture,
    errorDate,
    errorLastName,
    errorFirstName,
    errorMail,
    errorTestPassword,
    errorConfirmationTestPassword,
    newPassword,
    confirmationNewPassword,
    errorNewPassword,
    errorConfirmationNewPassword,
    ApiLink
  ]);

  const handleChangeForm = (e, arg = "") => {
    // manage the controlled input depending the value and the name

    const { value, name, files } = e.target;
    let val = arg === "" ? value : arg;
    val = val === "true" || val === "false" ? JSON.parse(val) : val;

    setDataCurrentUser((prevState) => {
      if (name === "picture") {
        return {
          ...prevState,
          data: { ...prevState.data, [name]: files },
        };
      } else {
        return {
          ...prevState,
          data: { ...prevState.data, [name]: val },
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // set issubmit to true when this function is called (onSubmit form)
    setDataCurrentUser((prevState) => ({
      ...prevState,
      isSubmit: true,
    }));

    // append the value to the data form
    dataform.append("lastName", lastName);
    dataform.append("firstName", firstName);
    dataform.append("date_birth", date_birth);
    dataform.append("gender", gender);
    dataform.append("email", email);
    dataform.append("isSubscribe", isSubscribe);
    dataform.append("testPassword", testPassword);
    newPassword !== "" && dataform.append("password", newPassword);

    // if there are not error put the data to the api
    if (!errorForm) {
      fetch(`${ApiLink}/user/me`, {
        method: method,
        credentials: "include",
        body: dataform,
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            // set issuccess to true and change the path_picture if there are not error
            setDataCurrentUser((prevState) => {
              if (result.picture) {
                return {
                  ...prevState,
                  isSuccess: true,
                  isSubmit: false,
                  isDisabledForm: true,
                  data: {
                    ...prevState.data,
                    path_picture: result.picture,
                  },
                };
              } else {
                return {
                  ...prevState,
                  isSuccess: true,
                  isSubmit: false,
                  isDisabledForm: true,
                };
              }
            });
            // reset the field when there not error
            setTimeout(() => {
              setDataCurrentUser((prevState) => ({
                ...prevState,
                isSuccess: false,
                data: {
                  ...prevState.data,
                  testPassword: "",
                  confirmationTestPassword: "",
                  newPassword: "",
                  confirmationNewPassword: "",
                },
              }));
            }, 1000);
          } else if (result.error) {
            // set isfailed to false if there are an error
            setDataCurrentUser((prevState) => ({
              ...prevState,
              isFailed: true,
            }));
            setTimeout(() => {
              setDataCurrentUser((prevState) => ({
                ...prevState,
                isFailed: false,
              }));
            }, 1000);
          }
        });
    }
  };
  return (
    <Informations
      dataCurrentUser={dataCurrentUser}
      setDataCurrentUser={setDataCurrentUser}
      handleChangeForm={handleChangeForm}
      handleSubmit={handleSubmit}
      isMediumWindow={props.isMediumWindow}
    />
  );
}

export default InformationsLogic;
