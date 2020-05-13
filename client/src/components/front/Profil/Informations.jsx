import React, { useState, useEffect } from "react";
import moment from "moment";
import DivInputForm from "../../general/Form/DivInputForm";

function Informations() {
  const [dataCurrentUser, setDataCurrentUser] = useState({
    method: "GET",
    data: {
      date_birth: "",
    },
    isFetched: false,
    isDisabledForm: true,
  });

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
              data: result.data,
              isFetched: true,
            }));
          }
        });
    }
  }, [dataCurrentUser]);

  const handleChangeForm = (e, arg = "") => {
    const { value, name } = e.target;
    const val = arg === "" ? value : arg;
    setDataCurrentUser((prevState) => ({
      ...prevState,
      data: { ...data, [name]: val },
    }));
  };

  const { data, isDisabledForm } = dataCurrentUser;
  const isDisabled = isDisabledForm ? "disabled" : "";

  return (
    <>
      <h3 className="title-profil text-center mb-4">Mes informations</h3>
      <form className="row form-group mx-auto" autoComplete="off">
        <div className="row my-3 d-flex justify-content-center ">
          {data.path_picture ? (
            <div className="col-12 m-0 p-0 row d-flex justify-content-between">
              <div className="col-4 col-sm-2 p-2 mx-auto">
                <img
                  src={`http://localhost:5000/uploads/img/${data.path_picture}`}
                  className="w-100 rounded-circle"
                  alt="avatar_image_profil"
                />
              </div>
            </div>
          ) : (
            <div className="col-12 m-0 p-0 row d-flex justify-content-between">
              <div className="col-4 col-sm-2 p-2 mx-auto">
                <img
                  src={`http://localhost:5000/uploads/img/default-avatar.png`}
                  className="w-100 rounded-circle"
                  alt="avatar_image_profil"
                />
              </div>
            </div>
          )}
          <label className="col-12 col-sm-3 col-md-4 col-lg-3 mt-2 text-center">
            Titre :
          </label>
          <label className="col-6 col-sm-4 col-lg-2 mt-2 text-center">
            Mr
            <input
              type="radio"
              name="gender"
              disabled={isDisabled}
              className="mx-1"
              checked={data.gender === "mr"}
              id="mr"
              key="mr"
              onChange={(e) => handleChangeForm(e, "mr")}
            />
          </label>
          <label className="col-6 col-sm-4 col-lg-2 mt-2 text-center">
            Mrs
            <input
              type="radio"
              name="gender"
              className="mx-1"
              disabled={isDisabled}
              id="mrs"
              key="mrs"
              checked={data.gender === "mrs"}
              onChange={(e) => handleChangeForm(e, "mrs")}
            />
          </label>
        </div>
        <DivInputForm
          label={"Nom :"}
          containerClass="row mr-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center m-0"
          inputClass="form-control col-12 col-sm-6 col-md-7 text-center"
          name="lastName"
          type="text"
          disabled={isDisabled}
          value={"lastName" in data && data.lastName}
          change={(e) => {
            handleChangeForm(e);
          }}
          errormessage="Le nom ne peut pas contenir de chiffre ou de charactère spécial"
        />
        <DivInputForm
          label={"Prénom :"}
          containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center m-0"
          inputClass="form-control col-12 col-sm-6 col-md-7 text-center"
          name="firstName"
          type="text"
          disabled={isDisabled}
          value={"firstName" in data && data.firstName}
          change={(e) => {
            handleChangeForm(e);
          }}
          errormessage="Le nom ne peut pas contenir de chiffre ou de charactère spécial"
        />
        <DivInputForm
          label={"Email :"}
          containerClass="row mr-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center m-0"
          inputClass="form-control col-12 col-sm-6 col-md-9 text-center"
          name="email"
          type="text"
          disabled={isDisabled}
          value={"email" in data && data.email}
          change={(e) => {
            handleChangeForm(e);
          }}
          errormessage="Le nom ne peut pas contenir de chiffre ou de charactère spécial"
        />
        <DivInputForm
          label={"Date de naissance :"}
          containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center m-0"
          inputClass="form-control col-12 col-sm-6 p-0 col-md-5 text-center"
          name="date_birth"
          type="date"
          min="1940-01-01"
          max="2010-01-01"
          disabled={isDisabled}
          value={
            data.date_birth && moment(data.date_birth).format("YYYY-MM-DD")
          }
          change={(e) => {
            handleChangeForm(e);
          }}
          errormessage="Le nom ne peut pas contenir de chiffre ou de charactère spécial"
        />
      </form>
    </>
  );
}

export default Informations;
