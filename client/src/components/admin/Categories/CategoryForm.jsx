import React, { useContext } from "react";
import moment from "moment";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { PopupAddContext } from "../../../context/PopupAddContext";
import DivInputForm from "../../admin/Form/DivInputForm";
import HeadFormAdmin from "../Form/HeadFormAdmin";

function CategoryForm(props) {
  const PopupContext = useContext(PopupAddContext);

  // the redirect props is settled to true, redirect after registered a new category
  if (props.redirect) {
    window.location.reload(false);
  }

  return (
    <>
      <HeadFormAdmin
        titlepage={PopupContext.isToggle ? 
          "Ajouter une catégorie"
          :"Modifier une catégorie"}
        isFailed={props.isFailed}
        isSuccess={props.isSuccess}
        errorPost={props.errorPost}
        successMessage={PopupContext.isToggle ?
          "Article enregistré avec succés" :
          "Modification enregistré avec succés"
        }
        failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
      />
      <form
        className="mx-auto text-center widthform py-md-2"
        onSubmit={props.handleSubmit}
      >
        {!PopupContext.isToggle && (
          <>
            <div className="row form-group my-3 d-flex justify-content-center align-items-center">
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
            <div className="row form-group my-3 d-flex justify-content-center align-items-center">
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
            props.setErrorPost(false);
          }}
          errorcondition={props.errorTitle}
          errormessage="Ce champ ne peut pas contenir de chiffre"
        />
        <DivInputForm
          label={"Lien :"}
          value={props.link}
          name="link"
          type="text"
          change={(e) => {
            props.setLink(e.target.value);
            props.setErrorPost(false);
          }}
          errorcondition={props.errorLink}
          errormessage="Ce champ ne peut pas contenir d'espace ou de chiffre"
        />
        {props.errorDescription && (
          <span className="text-danger errormessage text-center">
            Ce champ doit contenir entre 10 et 150 caractères
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Description :</label>
          <textarea
            type="text"
            name="description"
            value={props.description}
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              props.setDescription(e.target.value);
              props.setErrorPost(false);
            }}
          />
        </div>
        <div className="col-12 form-group my-4">
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

export default CategoryForm;
