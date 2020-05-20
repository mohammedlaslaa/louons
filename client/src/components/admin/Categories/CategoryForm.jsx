import React, { useContext } from "react";
import moment from "moment";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { PopupAddContext } from "../../../context/PopupAddContext";
import DivInputForm from "../../general/Form/DivInputForm";
import Form from "../../general/Form/Form";

function CategoryForm(props) {
  const PopupContext = useContext(PopupAddContext);

  // the redirect props is settled to true, redirect after registered a new category
  if (props.redirect) {
    window.location.reload(false);
  }

  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={
        PopupContext.isToggle
          ? "Ajouter une catégorie"
          : "Modifier une catégorie"
      }
      isFailed={props.isFailed}
      isSuccess={props.isSuccess}
      successMessage={`Article ${props.statusMessageForm} avec succés`}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
      {!PopupContext.isToggle && (
        <>
          <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
            <label className="col-9 col-sm-4 mt-2">Active :</label>
            <BootstrapSwitchButton
              checked={props.isActive}
              onlabel="Actif"
              offlabel="Inactif"
              size="xs"
              width="70"
              onChange={() => {
                props.handleFetchPut("isActive");
              }}
            />
          </div>
          <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
            <label className="col-9 col-sm-4 mt-2">Date de création :</label>
            <p className="m-0">
              {moment(props.dateRegister).format("DD-MM-YYYY")}
            </p>
          </div>
        </>
      )}
      <DivInputForm
        label={"Titre :"}
        name="title"
        type="text"
        value={props.title}
        change={(e) => {
          props.setTitle(e.target.value);
        }}
        errorcondition={props.errorTitle && props.isSubmit}
        errormessage="Ce champ ne peut pas contenir de chiffre ou être vide"
      />
      <DivInputForm
        label={"Lien :"}
        value={props.link}
        name="link"
        type="text"
        change={(e) => {
          props.setLink(e.target.value);
        }}
        errorcondition={props.errorLink && props.isSubmit}
        errormessage="Ce champ ne peut pas contenir d'espace ou de chiffre ou être vide"
      />
      {props.errorDescription && props.isSubmit && (
        <span className="text-danger errormessage text-center">
          Ce champ doit contenir entre 10 et 150 caractères
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
        <label className="col-9 col-sm-6 mt-2">Description :</label>
        <textarea
          type="text"
          name="description"
          value={props.description}
          className="form-control col-9 col-sm-6"
          onChange={(e) => {
            props.setDescription(e.target.value);
          }}
        />
      </div>
    </Form>
  );
}

export default CategoryForm;
