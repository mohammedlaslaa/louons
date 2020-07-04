import React from "react";
import moment from "moment";
import DivInputForm from "../../general/Form/DivInputForm";
import TitleSection from "./TitleSection";
import Api from '../../../Classes/Api/Api.js';

function Informations(props) {
  const ApiLinkImage = Api.endPointImage;
  
  const { data, isDisabledForm, isLoading } = props.dataCurrentUser;

  const isDisabled = isDisabledForm ? "disabled" : "";

  return isLoading ? (
    <p className="p-2 text-white bg-success">Chargement...</p>
  ) : (
    <>
      <TitleSection
        isMediumWindow={props.isMediumWindow}
        title="Mes Informations"
      />
      {props.dataCurrentUser.isSuccess ? (
        <p className="bg-success text-white text-center p-2 w-100">
          Information mis à jour avec succés
        </p>
      ) : props.dataCurrentUser.isFailed ? (
        <p className="bg-danger text-white text-center p-2 w-100">
          Mot de passe incorrect ou erreur formulaire
        </p>
      ) : (
        true
      )}
      <form
        className="row form-group mx-auto d-flex justify-content-center"
        autoComplete="off"
        onSubmit={(e) => props.handleSubmit(e)}
      >
        {props.dataCurrentUser.errorPicture &&
          props.dataCurrentUser.isSubmit && (
            <span className="text-danger errormessage text-center mx-auto">
              Seule une image sous le format png ou jpg/jpeg est accepté
            </span>
          )}
        <div className="col-12 m-0 p-0 row d-flex justify-content-between">
          <div className="col-4 col-sm-2 p-2 mx-auto d-flex align-items-center">
            <img
              src={
                data.path_picture
                  ? `${ApiLinkImage}/uploads/img/${data.path_picture}`
                  : `${ApiLinkImage}/uploads/img/default-avatar.png`
              }
              className="w-100 rounded-circle"
              alt="avatar_image_profil"
            />
            {!isDisabled && (
              <div className="file-picture-profil">
                <i className="ri-edit-line ri-2x text-white"></i>
                <span className="input-profil">
                  <input
                    type="file"
                    name="picture"
                    multiple={true}
                    onChange={(e) => props.handleChangeForm(e)}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="row my-3 col-12 col-sm-8 col-lg-7 d-flex justify-content-center">
          <label className="col-12 col-sm-4 mt-2 text-center">Titre :</label>
          <label className="col-5 col-sm-4 mt-2 text-center">
            Mr
            <input
              type="radio"
              name="gender"
              disabled={isDisabled}
              className="mx-1"
              checked={data.gender === "mr"}
              id="mr"
              key="mr"
              onChange={(e) => props.handleChangeForm(e, "mr")}
            />
          </label>
          <label className="col-5 col-sm-4 mt-2 text-center">
            Mrs
            <input
              type="radio"
              name="gender"
              className="mx-1"
              disabled={isDisabled}
              id="mrs"
              key="mrs"
              checked={data.gender === "mrs"}
              onChange={(e) => props.handleChangeForm(e, "mrs")}
            />
          </label>
        </div>
        <DivInputForm
          label="Nom :"
          containerClass="row mr-xl-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center my-2 m-md-0"
          inputClass="form-control col-12 col-sm-6 col-md-7 text-center"
          name="lastName"
          type="text"
          errorcondition={props.dataCurrentUser.errorLastName}
          disabled={isDisabled}
          value={"lastName" in data && data.lastName}
          change={(e) => {
            props.handleChangeForm(e);
          }}
          errormessage="Le nom ne peut pas contenir de chiffre ou de caractères spéciaux et ne doit pas être vide"
        />
        <DivInputForm
          label={"Prénom :"}
          containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center my-2 m-md-0"
          inputClass="form-control col-12 col-sm-6 col-md-7 text-center"
          name="firstName"
          type="text"
          errorcondition={props.dataCurrentUser.errorFirstName}
          disabled={isDisabled}
          value={"firstName" in data && data.firstName}
          change={(e) => {
            props.handleChangeForm(e);
          }}
          errormessage="Le prénom ne peut pas contenir de chiffre ou de caractères spéciaux et ne doit pas être vide"
        />
        <DivInputForm
          label={"Email :"}
          containerClass="row mr-xl-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center my-2 m-md-0"
          inputClass="form-control col-12 col-sm-6 col-md-9 text-center"
          name="email"
          type="text"
          disabled={isDisabled}
          errorcondition={props.dataCurrentUser.errorMail}
          value={"email" in data && data.email}
          change={(e) => {
            props.handleChangeForm(e);
          }}
          errormessage="L'email doit être au format johndoe@louons.fr"
        />
        <DivInputForm
          label={"Date de naissance :"}
          containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center my-2 m-md-0"
          inputClass="form-control date-size col-12 col-sm-6 p-0 col-md-5 text-center"
          name="date_birth"
          type="date"
          min="1940-01-01"
          max="2010-01-01"
          errormessage="Date incorrect"
          errorcondition={props.dataCurrentUser.errorDate}
          disabled={isDisabled}
          value={
            data.date_birth && moment(data.date_birth).format("YYYY-MM-DD")
          }
          change={(e) => {
            props.handleChangeForm(e);
          }}
        />
        <div className="row mr-xl-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center">
          <label className="text-center my-2 m-md-0">Newsletter :</label>
          <select
            name="isSubscribe"
            id="category"
            disabled={isDisabled}
            className="form-control col-12 col-sm-6 p-0 col-md-5 text-center"
            value={data.isSubscribe}
            onChange={(e) => props.handleChangeForm(e)}
          >
            <option value={"true"}>Oui</option>
            <option value={"false"}>Non</option>
          </select>
        </div>
        <DivInputForm
          label={"Date d'inscription :"}
          containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
          labelClass="text-center my-2 m-md-0"
          inputClass="form-control date-size col-12 col-sm-6 p-0 col-md-5 text-center"
          name="date_register"
          type="date"
          disabled="disabled"
          value={
            data.date_register &&
            moment(data.date_register).format("YYYY-MM-DD")
          }
        />
        {isDisabled ? (
          <button
            className="mx-auto my-3 btn btn-info"
            onClick={() =>
              props.setDataCurrentUser((prevState) => ({
                ...prevState,
                isDisabledForm: false,
                method: "PUT",
              }))
            }
          >
            Modifier
          </button>
        ) : (
          <>
            <p className="text-secondary text-center p-2 w-100 mb-0">
              Pour toute modification, veuillez confirmer votre mot de passe.
            </p>
            <DivInputForm
              containerClass="row mr-xl-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
              labelClass="text-center my-2 m-md-0"
              inputClass="form-control col-12 col-sm-6 p-0 col-md-5 text-center"
              label={"Mot de passe Actuel :"}
              name="testPassword"
              type="password"
              autoComplete="new-password"
              value={data.testPassword}
              change={(e) => {
                props.handleChangeForm(e);
              }}
              errorcondition={
                props.dataCurrentUser.errorTestPassword &&
                props.dataCurrentUser.isSubmit
              }
              errormessage=" Le mot de passe doit contenir au moins 8 charactères, une majuscule
          un chiffre et un caractère spécial"
            />
            <DivInputForm
              containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
              labelClass="text-center my-2 m-md-0"
              inputClass="form-control col-12 col-sm-6 p-0 col-md-5 text-center"
              label={"Confirmation :"}
              name="confirmationTestPassword"
              type="password"
              value={data.confirmationTestPassword}
              change={(e) => {
                props.handleChangeForm(e);
              }}
              errorcondition={
                props.dataCurrentUser.errorConfirmationTestPassword
              }
              errormessage="Le mot de passe de confirmation doit être identique"
            />
            <DivInputForm
              containerClass="row mr-xl-2 col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
              labelClass="text-center my-2 m-md-0"
              inputClass="form-control col-12 col-sm-6 p-0 col-md-5 text-center"
              label={"Nouveau mdp :"}
              name="newPassword"
              type="password"
              autoComplete="new-password"
              value={data.newPassword}
              change={(e) => {
                props.handleChangeForm(e);
              }}
              errorcondition={
                props.dataCurrentUser.errorNewPassword &&
                props.dataCurrentUser.isSubmit
              }
              errormessage=" Le mot de passe doit contenir au moins 8 charactères, une majuscule
          un chiffre et un caractère spécial"
            />
            <DivInputForm
              containerClass="row col-12 col-xl-6 my-2 d-flex flex-row justify-content-center justify-content-sm-between align-items-center"
              labelClass="text-center my-2 m-md-0"
              inputClass="form-control col-12 col-sm-6 p-0 col-md-5 text-center"
              label={"Confirmation :"}
              name="confirmationNewPassword"
              type="password"
              value={data.confirmationNewPassword}
              change={(e) => {
                props.handleChangeForm(e);
              }}
              errorcondition={
                props.dataCurrentUser.errorConfirmationNewPassword
              }
              errormessage="Le mot de passe de confirmation doit être identique"
            />
            <input
              type="submit"
              className="mx-auto my-3 btn btn-info"
              value="Envoyer"
            />
          </>
        )}
      </form>
    </>
  );
}

export default Informations;
