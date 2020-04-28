import React, { useContext } from "react";
import moment from "moment";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { PopupAddContext } from "../../../context/PopupAddContext";

function CategoryForm(props) {
  const PopupContext = useContext(PopupAddContext);

  // the redirect props is settled to true, redirect after registered a new category
  if (props.redirect) {
    window.location.reload(false);
  }

  return (
    <>
      <h4 className="titlepage">{props.titlepage} une catégorie</h4>
      {props.successMessage ? (
        <p className="bg-success text-white text-center p-2">
          Modification enregistré avec succés
        </p>
      ) : props.errorMessage ? (
        <p className="bg-danger text-white text-center p-2">
          Erreur de duplication ou champ vide
        </p>
      ) : (
        true
      )}
      {props.errorPost && (
        <p className="bg-danger text-white text-center p-2">
          Aucun champ ne peut être vide ou erreur de duplication
        </p>
      )}
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

        {props.errorTitle && (
          <span className="text-danger lastnameerror text-center">
            Ce champ ne peut pas contenir de chiffre
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Titre :</label>
          <input
            type="text"
            name="title"
            value={props.title}
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              props.setTitle(e.target.value);
              props.setErrorPost(false);
            }}
          />
        </div>
        {props.errorLink && (
          <span className="text-danger lastnameerror text-center">
            Ce champ ne peut pas contenir de chiffre
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Lien :</label>
          <input
            type="text"
            name="link"
            value={props.link}
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              props.setLink(e.target.value);
              props.setErrorPost(false);
            }}
          />
        </div>
        {props.errorDescription && (
          <span className="text-danger lastnameerror text-center">
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
