import React, { useState, useEffect } from "react";
import Informations from "./Informations";

function InformationsLogic() {
  const [dataCurrentUser, setDataCurrentUser] = useState({
    method: "GET",
    data: {
      date_birth: "",
      picture: [],
    },
    password: "",
    confirmationPassword: "",
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
    errorPassword: false,
    errorConfirmationPassword: false,
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
  } = dataCurrentUser.data;

  // initialize the regex

  const regexName = new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/);
  const regexMail = new RegExp(
    /^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/
  );
  const regexPassword = new RegExp(
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,./{}|:<>?~]).{8,20})/
  );

  useEffect(() => {
    if (!dataCurrentUser.isFetched) {
      fetch("http://localhost:5000/louons/api/v1/user/me", {
        method: dataCurrentUser.method,
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

    if (dataCurrentUser.isFetched && dataCurrentUser.method === "PUT") {
      if (Object.keys(dataCurrentUser.data.picture).length === 1) {
        for (let i = 0; i < dataCurrentUser.data.picture.length; i++) {
          if (
            dataCurrentUser.data.picture[i].type !== "image/png" &&
            dataCurrentUser.data.picture[i].type !== "image/jpeg" &&
            !dataCurrentUser.errorPicture
          ) {
            setDataCurrentUser((prevState) => ({
              ...prevState,
              errorPicture: true,
              numberErrorForm: prevState.numberErrorForm + 1,
            }));
          } else if (
            dataCurrentUser.data.picture[i].type === "image/png" ||
            dataCurrentUser.data.picture[i].type === "image/jpeg"
          ) {
            if (dataCurrentUser.errorPicture) {
              setDataCurrentUser((prevState) => ({
                ...prevState,
                errorPicture: false,
                numberErrorForm: prevState.numberErrorForm - 1,
              }));
            }
            console.log(dataCurrentUser.data.picture[i]);
            dataform.append(`file${i}`, dataCurrentUser.data.picture[i]);
          }
        }
      } else if (
        Object.keys(dataCurrentUser.data.picture).length > 1 &&
        !dataCurrentUser.errorPicture
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorPicture: true,
          numberErrorForm: prevState.numberErrorForm + 1,
        }));
      }

      if (
        (new Date(dataCurrentUser.data.date_birth).getFullYear() < 1940 ||
          new Date(dataCurrentUser.data.date_birth).getFullYear() > 2010) &&
        !dataCurrentUser.errorDate
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorDate: true,
          numberErrorForm: prevState.numberErrorForm + 1,
        }));
      } else if (
        new Date(dataCurrentUser.data.date_birth).getFullYear() > 1940 &&
        new Date(dataCurrentUser.data.date_birth).getFullYear() < 2010 &&
        dataCurrentUser.errorDate
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorDate: false,
          numberErrorForm: prevState.numberErrorForm - 1,
        }));
      }

      if (!regexName.test(lastName) && !dataCurrentUser.errorLastName) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorLastName: true,
          numberErrorForm: prevState.numberErrorForm + 1,
        }));
      } else if (
        regexName.test(lastName) &&
        lastName !== "" &&
        dataCurrentUser.errorLastName
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorLastName: false,
          numberErrorForm: prevState.numberErrorForm - 1,
        }));
      }

      if (
        regexName.test(dataCurrentUser.data.firstName) &&
        dataCurrentUser.data.firstName !== "" &&
        dataCurrentUser.errorFirstName
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorFirstName: false,
          numberErrorForm: prevState.numberErrorForm - 1,
        }));
      } else if (
        !regexName.test(dataCurrentUser.data.firstName) &&
        !dataCurrentUser.errorFirstName
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorFirstName: true,
          numberErrorForm: prevState.numberErrorForm + 1,
        }));
      }

      if (
        regexMail.test(dataCurrentUser.data.email) &&
        dataCurrentUser.data.email !== "" &&
        dataCurrentUser.errorMail
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorMail: false,
          numberErrorForm: prevState.numberErrorForm - 1,
        }));
      } else if (
        !regexMail.test(dataCurrentUser.data.email) &&
        !dataCurrentUser.errorMail
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorMail: true,
          numberErrorForm: prevState.numberErrorForm + 1,
        }));
      }

      if (dataCurrentUser.numberErrorForm > 0 && !dataCurrentUser.errorForm) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorForm: true,
        }));
      } else if (
        dataCurrentUser.numberErrorForm === 0 &&
        dataCurrentUser.errorForm
      ) {
        setDataCurrentUser((prevState) => ({
          ...prevState,
          errorForm: false,
        }));
      }
    }
  }, [
    dataCurrentUser,
    regexMail,
    regexName,
    regexPassword,
    dataform,
    lastName,
    firstName,
    date_birth,
    email,
  ]);

  const handleChangeForm = (e, arg = "") => {
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
    setDataCurrentUser((prevState) => ({
      ...prevState,
      isSubmit: true,
    }));

    dataform.append("lastName", lastName);
    dataform.append("firstName", firstName);
    dataform.append("date_birth", date_birth);
    dataform.append("gender", gender);
    dataform.append("email", email);
    dataform.append("isSubscribe", isSubscribe);

    if (!dataCurrentUser.errorForm) {
      fetch(`http://localhost:5000/louons/api/v1/user/me`, {
        method: dataCurrentUser.method,
        credentials: "include",
        body: dataform,
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) {
            // set issuccess to true if there are not error
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
            setTimeout(() => {
              setDataCurrentUser((prevState) => ({
                ...prevState,
                isSuccess: false,
              }));
            }, 1500);
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
            }, 1500);
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
    />
  );
}

export default InformationsLogic;
