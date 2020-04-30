import React from "react";
import DivInputForm from "../../general/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HeadFormAdmin from "../HeadFormAdmin";

function ArticleForm(props) {
  return (
    <>
      <HeadFormAdmin
        titlepage={`${props.titlepage} un article`}
        isFailed={props.isFailed}
        errorPost={props.errorPost}
        successMessage="Article enregistré avec succés"
        failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
      />
      <form
        className="mx-auto text-center widthform py-md-2"
        onSubmit={props.handleSubmit}
      >
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Etat :</label>
          <BootstrapSwitchButton
            checked={props.isActive}
            onlabel="Actif"
            offlabel="Inactif"
            size="xs"
            width="70"
            onChange={() => {
              props.setIsActive(!props.isActive);
            }}
          />
        </div>
        {props.errorCategory && props.isSubmit && (
          <span className="text-danger errormessage text-center">
            Veuillez sélectionner une catégorie
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Catégorie :</label>
          <select
            name="id_category"
            id="category"
            className="p-1"
            value={props.idCategory}
            onChange={(e) => props.setIdCategory(e.target.value)}
          >
            <option value="">--Veuillez choisir une catégorie--</option>
            {props.category.map((elt) => (
              <option key={elt._id} value={elt._id}>
                {elt.title}
              </option>
            ))}
          </select>
        </div>
        {props.errorGrasp && (
          <span className="text-danger errormessage text-center">
            Veuillez saisir le nom ou le prénom de l'utilisateur en toute lettre et le sélectionner sur la liste
          </span>
        )}
        <div className="position-relative">
          <DivInputForm
            label={"Propriétaire :"}
            name="owner"
            type="text"
            value={props.grasp}
            change={(e) => {
              props.setGrasp(e.target.value);
              props.getList(e.target.value);
              props.setIsShow(true);
              props.setOwner("")
              props.setErrorGrasp(true)
            }}
          />
          {props.isShow && props.grasp !== "" && (
            <ul className="list-unstyled bg-white autocomplete">
              {props.users.map((e) => (
                <li
                  className="p-1 border-black listcomplete"
                  key={e._id}
                  onClick={() => {
                    props.setGrasp(`${e.lastName} ${e.firstName}`);
                    props.setIsShow(false);
                    props.setOwner(e._id)
                    props.setErrorGrasp(false)
                  }}
                >{`${e.clientId} ${e.lastName} ${e.firstName}`}</li>
              ))}
            </ul>
          )}
        </div>
        <DivInputForm
          label={"Titre :"}
          name="title"
          type="text"
          value={props.title}
          change={(e) => {
            props.setTitle(e.target.value);
            props.setErrorPost(false);
          }}
          errorcondition={props.errorTitle && props.isSubmit}
          errormessage="Ce champ doit contenir entre 3 et 30 caractères"
        />
        {props.errorDescription && props.isSubmit && (
          <span className="text-danger errormessage text-center">
            Ce champ doit contenir entre 10 et 250 caractères
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
        {props.errorPrice && props.isSubmit && (
          <span className="text-danger errormessage text-center">
            Veuillez saisir un prix valide compris entre 0 et 2000
          </span>
        )}
        <DivInputForm
          label={"Tarif €/jr :"}
          name="price"
          type="number"
          value={props.price}
          change={(e) => {
            props.setPrice(e.target.value);
            props.setErrorPost(false);
          }}
        />
        {props.errorFile > 0 && props.isSubmit && (
          <span className="text-danger errormessage text-center">
          L'article doit contenir 3 images sous le format png ou jpg/jpeg
          </span>
        )}
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-9 col-sm-4 mt-2">Images :</label>
          <input
            type="file"
            name="file"
            multiple={true}
            value={props.picture}
            className="form-control-file col-9 col-sm-6 col-md-5"
            onChange={(e) => {
                props.setPicture(e.target.files)
            }}
          />
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

export default ArticleForm;
