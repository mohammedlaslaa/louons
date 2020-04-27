import React from "react";
import moment from "moment";

function AddUserForm(props) {
  return (
    <>
      <h4 className="titlepage">{props.title} un utilisateur</h4>
      {props.isSuccess && (
        <p className="bg-success text-white text-center p-2">
          Utilisateur enregistré avec succés !
        </p>
      )}
      {props.isFailed && (
        <p className="bg-danger text-white text-center p-2">
          Une erreur s'est produite, veuillez vérifier votre formulaire ou
          recommencer.
        </p>
      )}
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
        {props.errorLastName && (
          <span className="text-danger lastnameerror text-center">
            Le nom ne peut pas contenir de chiffre ou de charactère spécial
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Nom :</label>
          <input
            type="text"
            name="lastname"
            value={props.lastName}
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              props.handleName(e);
            }}
          />
        </div>
        {props.errorFirstName && (
          <span className="text-danger lastnameerror text-center">
            Le prénom ne peut pas contenir de chiffre ou de charactère spécial
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Prénom :</label>
          <input
            type="text"
            name="firstname"
            value={props.firstName}
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              props.handleName(e);
            }}
          />
        </div>
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Date de naissance :</label>
          <input
            type="date"
            name="datebirth"
            min="1940-01-01"
            max={"2010-01-01"}
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
        {props.errorMail && (
          <span className="text-danger lastnameerror text-center">
            L'email doit être au format johndoe@louons.fr
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Email :</label>
          <input
            type="email"
            name="email"
            value={props.email}
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </div>
        {props.errorPassword && (
          <span className="text-danger lastnameerror text-center">
            Le mot de passe doit contenir au moins 8 charactères, une majuscule
            un chiffre et un caractère spécial
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Mot de passe :</label>
          <input
            type="password"
            name="password"
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>
        {props.errorConfirmation && (
          <span className="text-danger lastnameerror text-center">
            Le mot de passe de confirmation doit être identique
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Confirmation :</label>
          <input
            type="password"
            name="passwordconf"
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => props.setConfirmationPassword(e.target.value)}
          />
        </div>
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Inscription à la newsletter :</label>
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
