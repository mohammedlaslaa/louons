import React, { useEffect, useContext } from "react";
import DivInputForm from "./DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AutoCompleteField from "./AutoCompleteField";
import TextAreaInputForm from "./TextAreaInputForm";
import InputFileForm from "./InputFileForm";
import Form from "./Form";
import { AuthContext } from "../../../context/AuthContext";

function ArticleForm(props) {
  const { dataUser } = useContext(AuthContext);

  useEffect(() => {
    if (!dataUser.adminLevel) {
      props.setErrorGrasp(false);
      props.setOwner(dataUser.id);
    }
  }, [dataUser, props]);

  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage} un article`}
      isFailed={props.isFailed}
      isSuccess={props.isSuccess}
      successMessage={`Article ${props.statusMessageForm} avec succés`}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
      {dataUser.adminLevel && (
        <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
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
      )}
      {props.pictureDisplay && props.pictureDisplay.length > 0 && (
        <div className="col-12 m-0 p-0 row d-flex justify-content-between">
          {props.pictureDisplay.map((e) => (
            <div className="col-4 col-sm-4 p-2 col-md-3 mx-auto" key={e.title}>
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
        <span className="text-danger errormessage text-center mx-auto">
          Veuillez sélectionner une catégorie
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
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
      {dataUser.adminLevel && (
        <AutoCompleteField
          errorGrasp={props.errorGrasp}
          idParams={props.idParams}
          grasp={props.grasp}
          titleLabel="Propriétaire"
          setGrasp={props.setGrasp}
          setId={props.setOwner}
          setErrorGrasp={props.setErrorGrasp}
          link="http://localhost:5000/louons/api/v1/user/all"
        />
      )}
      <DivInputForm
        label={"Titre :"}
        name="title"
        labelClass="col-9 col-sm-4 mt-2"
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
        <span className="text-danger errormessage text-center mx-auto">
          Veuillez saisir un prix valide compris entre 0 et 2000
        </span>
      )}
      <DivInputForm
        label={"Tarif €/jr :"}
        name="price"
        labelClass="col-9 col-sm-4 mt-2"
        type="number"
        value={props.price}
        change={(e) => {
          props.setPrice(e.target.value);
        }}
      />
      <InputFileForm
        errorFile={props.errorFile}
        isSubmit={props.isSubmit}
        setPicture={(e) => props.setPicture(e.target.files)}
        errorMessage="L'article doit contenir 3 images sous le format png ou jpg/jpeg"
        isMultiple={true}
      />
    </Form>
  );
}

export default ArticleForm;
