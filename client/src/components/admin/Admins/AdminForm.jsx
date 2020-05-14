import React from "react";
import moment from "moment";
import Form from "../../general/Form/Form";
import DivInputForm from "../../general/Form/DivInputForm";
import InputFileForm from "../../general/Form/InputFileForm";

function AdminForm(props) {
  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage} admin`}
      isFailed={props.isFailed}
      isSuccess={props.isSuccess}
      successMessage={`Utilisateur enregistré avec succés`}
      failMessage="Erreur de duplication utilisateur ou champs vide, veuillez vérifier votre formulaire"
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
        setPicture={(e) => props.setPicture(e.target.files)}
        label={"Photo de profil"}
        errorMessage="Seule une image sous le format png ou jpg/jpeg est accepté"
        isMultiple={true}
      />
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
        <label className="col-9 col-sm-4 mt-2">Titre :</label>
        <div className="col-12 col-sm-6 col-md-5">
          <label className="col-6 col-sm-5 mt-2">
            Mr
            <input
              type="radio"
              name="gender"
              className="mx-1"
              checked={props.gender === "mr"}
              id="mr"
              key="mr"
              onChange={() => props.setGender("mr")}
            />
          </label>
          <label className="col-6 col-sm-5 mt-2">
            Mrs
            <input
              type="radio"
              name="gender"
              className="mx-1"
              id="mrs"
              key="mrs"
              checked={props.gender === "mrs"}
              onChange={() => props.setGender("mrs")}
            />
          </label>
        </div>
      </div>
      {props.errorAdminLevel && props.isSubmit && (
        <span className="text-danger errormessage text-center">
          Veuillez sélectionner un rôle
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
        <label className="col-9 col-sm-4 mt-2">Rôle :</label>
        <select
          name="adminlevel"
          id="adminlevel"
          className="p-1 col-9 col-sm-6 col-md-5"
          value={props.adminLevel}
          onChange={(e) => {
            props.setAdminLevel(e.target.value);
          }}
        >
          <option value="">--Rôle admin--</option>
          <option value="superadmin">superadmin</option>
          <option value="admin">admin</option>
        </select>
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
        errormessage="Le nom ne peut pas contenir de chiffre ou de caractères spéciaux"
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
        errormessage="Le prénom ne peut pas contenir de chiffre ou de caractères spéciaux"
      />
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100 mx-auto">
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
        errormessage="Le mot de passe doit contenir au moins 8 charactères, une majuscule
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
    </Form>
  );
}

AdminForm.defaultProps = {
  dateBirth: "",
};

export default AdminForm;
