import React from "react";
import DivInputForm from "../Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HeadFormAdmin from "../Form/HeadFormAdmin";
import TextAreaInputForm from "../Form/TextAreaInputForm";
import InputFileForm from "../Form/InputFileForm";
import SubmitButton from "../Form/SubmitButton";

function PaymentForm(props) {
  return (
    <>
      <HeadFormAdmin
        titlepage={`${props.titlepage} une adresse`}
        isFailed={props.isFailed}
        isSuccess={props.isSuccess}
        successMessage={`Addresse ${props.statusMessageForm} avec succés`}
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
        <DivInputForm
          label={"Titre :"}
          name="title"
          type="text"
          value={props.title}
          change={(e) => {
            props.setTitle(e.target.value);
          }}
          errorcondition={props.errorTitle && props.isSubmit}
          errormessage="Ce champ doit contenir entre 5 et 30 caractères, et sans caractères spéciaux"
        />
        <TextAreaInputForm
          errorDescription={props.errorDescription}
          isSubmit={props.isSubmit}
          description={props.description}
          setDescription={props.setDescription}
          errorMessage="Ce champ doit contenir entre 10 et 200 caractères"
          label="Description :"
        />
        <InputFileForm
          errorPicture={props.errorPicture}
          isSubmit={props.isSubmit}
          picture={props.picture}
          setPicture={props.setPicture}
          errorMessage="L'article doit contenir 3 images sous le format png ou jpg/jpeg"
          isMultiple={false}
        />
        <SubmitButton />
      </form>
    </>
  );
}

export default PaymentForm;
