import React from "react";
import DivInputForm from "../../admin/Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HeadFormAdmin from "../Form/HeadFormAdmin";
import AutoCompleteUserId from "../../admin/Form/AutoCompleteUserId";
import TextAreaInputForm from "../Form/TextAreaInputForm";
import InputFileForm from "../Form/InputFileForm";
import SubmitButton from "../Form/SubmitButton";

function ArticleForm(props) {
  return (
    <>
      <HeadFormAdmin
        titlepage={`${props.titlepage} un article`}
        isFailed={props.isFailed}
        isSuccess={props.isSuccess}
        successMessage={`Article ${props.statusMessageForm} avec succés`}
        failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
      />
      <form
        className="mx-auto text-center widthform py-md-2"
        onSubmit={props.handleSubmit}
      >
        <div className="row form-group my-3 d-flex justify-content-center align-items-center">
          <label className="col-12 col-sm-4 mt-2">Etat :</label>
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
        {props.pictureDisplay.length > 0 && (
          <div className="col-12 m-0 p-0 row d-flex justify-content-between">
            {props.pictureDisplay.map((e) => (
              <div
                className="col-4 col-sm-4 p-2 col-md-3 mx-auto"
                key={e.title}
              >
                <img
                  src={`http://localhost:5000/uploads/img/${e.path_picture}`}
                  className="w-100"
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
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
            className="p-1 col-9 col-sm-6 col-md-5"
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
        <AutoCompleteUserId
          errorGrasp={props.errorGrasp}
          idParams={props.idParams}
          grasp={props.grasp}
          isShow={props.isShow}
          setGrasp={props.setGrasp}
          setIsShow={props.setIsShow}
          setOwner={props.setOwner}
          setErrorGrasp={props.setErrorGrasp}
        />
        <DivInputForm
          label={"Titre :"}
          name="title"
          type="text"
          value={props.title}
          change={(e) => {
            props.setTitle(e.target.value);
          }}
          errorcondition={props.errorTitle && props.isSubmit}
          errormessage="Ce champ doit contenir entre 3 et 30 caractères"
        />
        <TextAreaInputForm
          errorDescription={props.errorDescription}
          isSubmit={props.isSubmit}
          description={props.description}
          setDescription={props.setDescription}
          errorMessage="Ce champ doit contenir entre 10 et 250 caractères"
          label="Description :"
        />
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
          }}
        />
        <InputFileForm
          errorFile={props.errorFile}
          isSubmit={props.isSubmit}
          picture={props.picture}
          setPicture={props.setPicture}
          errorMessage="L'article doit contenir 3 images sous le format png ou jpg/jpeg"
          isMultiple={true}
        />
        <SubmitButton />
      </form>
    </>
  );
}

export default ArticleForm;
