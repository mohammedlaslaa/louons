import React from "react";
import moment from "moment";
import DivInputForm from "../Form/DivInputForm";
import HeadFormAdmin from "../Form/HeadFormAdmin";

function AddUserForm(props) {
  return (
    <>
      <HeadFormAdmin
        titlepage={`${props.titlepage} un utilisateur`}
        isSuccess={props.isSuccess}
        isFailed={props.isFailed}
        errorPost={props.errorPost}
        successMessage="Utilisateur enregistré avec succés"
        failMessage="Erreur de duplication utilisateur ou champs vide, veuillez vérifier votre formulaire"
      />
      <form
        className="mx-auto text-center widthform py-md-2"
        onSubmit={props.handleSubmit}
      >
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Titre :</label>
          <div>
            <label className="col-9 col-sm-4 mt-2">Mr</label>
            <input
              type="radio"
              name="gender"
              checked={props.gender === "mr"}
              id="mr"
              key="mr"
              onChange={() => props.setGender("mr")}
            />
            <label className="col-9 col-sm-4 mt-2">Mrs</label>
            <input
              type="radio"
              name="gender"
              id="mrs"
              key="mrs"
              checked={props.gender === "mrs"}
              onChange={() => props.setGender("mrs")}
            />
          </div>
        </div>
        <DivInputForm
          label={"Nom :"}
          name="lastname"
          type="text"
          value={props.lastName}
          change={(e) => {
            props.handleName(e);
            props.setErrorPost(false);
          }}
          errorcondition={props.errorLastName}
          errormessage="Le nom ne peut pas contenir de chiffre ou de charactère spécial"
        />
        <DivInputForm
          label={"Prénom :"}
          name="firstname"
          type="text"
          value={props.firstName}
          change={(e) => {
            props.handleName(e);
            props.setErrorPost(false);
          }}
          errorcondition={props.errorFirstName}
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
            props.setErrorPost(false);
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
            props.setErrorPost(false);
          }}
          errorcondition={props.errorPassword}
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
            props.setErrorPost(false);
          }}
          errorcondition={props.errorConfirmation}
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
        <div className="col-12 form-group my-3">
          <input
            type="submit"
            value="Envoyer"
            className="btn text-white bgcolor3c8ce4"
          />
        </div>
      </form>
    </>
  );
}

AddUserForm.defaultProps = {
  dateBirth: "",
};

export default AddUserForm;
