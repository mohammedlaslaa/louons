import React from "react";
import moment from "moment";
import DivInputForm from "../Form/DivInputForm";
import HeadFormAdmin from "../Form/HeadFormAdmin";
import SubmitButton from "../Form/SubmitButton";
import InputFileForm from "../Form/InputFileForm";

function UserForm(props) {
  return (
    <>
      <HeadFormAdmin
        titlepage={`${props.titlepage} un utilisateur`}
        isSuccess={props.isSuccess}
        isFailed={props.isFailed}
        successMessage="Utilisateur enregistré avec succés"
        failMessage="Erreur de duplication utilisateur ou champs vide, veuillez vérifier votre formulaire"
      />
      <form
        className="mx-auto text-center widthform py-md-2"
        onSubmit={props.handleSubmit}
      >
        {props.pictureDisplay !== "" && props.pictureDisplay !== undefined ? (
          <div className="col-12 m-0 p-0 row d-flex justify-content-between">
            <div
              className="col-4 col-sm-2 p-2 mx-auto"
              key={props.pictureDisplay}
            >
              <img
                src={`http://localhost:5000/uploads/img/${props.pictureDisplay}`}
                className="w-100 rounded-circle"
                alt="avatar_image_profil"
              />
            </div>
          </div>
        ) : (
          <div className="col-12 m-0 p-0 row d-flex justify-content-between">
            <div
              className="col-4 col-sm-2 p-2 mx-auto"
              key={props.pictureDisplay}
            >
              <img
                src={`http://localhost:5000/uploads/img/default-avatar.png`}
                className="w-100 rounded-circle"
                alt="avatar_image_profil"
              />
            </div>
          </div>
        )}
        <InputFileForm
          errorPicture={props.errorPicture}
          isSubmit={props.isSubmit}
          reset={props.picture}
          setPicture={props.setPicture}
          label={"Photo de profil"}
          errorMessage="Seule une image sous le format png ou jpg/jpeg est accepté"
          isMultiple={true}
        />
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Titre :</label>
          <div className="col-12 col-sm-6 col-md-5">
            <label className="col-6 col-sm-4 mt-2">
              Mr
              <input
                type="radio"
                name="gender"
                checked={props.gender === "mr"}
                id="mr"
                key="mr"
                onChange={() => props.setGender("mr")}
              />
            </label>
            <label className="col-6 col-sm-4 mt-2">
              Mrs
              <input
                type="radio"
                name="gender"
                id="mrs"
                key="mrs"
                checked={props.gender === "mrs"}
                onChange={() => props.setGender("mrs")}
              />
            </label>
          </div>
        </div>
        <DivInputForm
          label={"Nom :"}
          name="lastname"
          type="text"
          value={props.lastName}
          change={(e) => {
            props.handleName(e);
          }}
          errorcondition={props.errorLastName && props.isSubmit}
          errormessage="Le nom ne peut pas contenir de chiffre ou de charactère spécial"
        />
        <DivInputForm
          label={"Prénom :"}
          name="firstname"
          type="text"
          value={props.firstName}
          change={(e) => {
            props.handleName(e);
          }}
          errorcondition={props.errorFirstName && props.isSubmit}
          errormessage="Le prénom ne peut pas contenir de chiffre ou de charactère spécial"
        />
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Date de naissance :</label>
          <input
            type="date"
            name="datebirth"
            min="1940-01-01"
            max="2010-01-01"
            value={
              props.dateBirth && moment(props.dateBirth).format("YYYY-MM-DD")
            }
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              if (e.target.value === "") {
                props.setDateBirth();
              } else {
                props.setDateBirth(e.target.value);
              }
            }}
          />
        </div>
        <DivInputForm
          label={"Email :"}
          name="email"
          type="email"
          value={props.email}
          change={(e) => {
            props.setEmail(e.target.value);
          }}
          errorcondition={props.errorMail && props.isSubmit}
          errormessage="L'email doit être au format johndoe@louons.fr"
        />
        <DivInputForm
          label={"Mot de passe :"}
          name="password"
          type="password"
          value={props.password}
          change={(e) => {
            props.setPassword(e.target.value);
          }}
          errorcondition={
            props.method === "PUT"
              ? props.errorPassword && props.isSubmit
              : props.errorPassword
          }
          errormessage=" Le mot de passe doit contenir au moins 8 charactères, une majuscule
          un chiffre et un caractère spécial"
        />
        <DivInputForm
          label={"Confirmation :"}
          name="passwordconf"
          type="password"
          value={props.confirmationPassword}
          change={(e) => {
            props.setConfirmationPassword(e.target.value);
          }}
          errorcondition={
            props.method === "PUT"
              ? props.errorConfirmation && props.isSubmit
              : props.errorConfirmation
          }
          errormessage="Le mot de passe de confirmation doit être identique"
        />
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">
            Inscription à la newsletter :
          </label>
          <div>
            <label className="col-9 col-sm-4 mt-2">Oui</label>
            <input
              type="radio"
              name="issubscribe"
              checked={props.isSubscribe}
              id="subscribe"
              key="subscribe"
              onChange={() => props.setIsSubscribe(true)}
            />
            <label className="col-9 col-sm-4 mt-2">Non</label>
            <input
              type="radio"
              name="issubscribe"
              id="notsubscribe"
              key="notsubscribe"
              checked={!props.isSubscribe}
              onChange={() => props.setIsSubscribe(false)}
            />
          </div>
        </div>
        <SubmitButton />
      </form>
    </>
  );
}

UserForm.defaultProps = {
  dateBirth: "",
};

export default UserForm;
