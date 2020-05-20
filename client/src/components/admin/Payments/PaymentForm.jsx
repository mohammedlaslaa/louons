import React from "react";
import Form from "../../general/Form/Form";
import DivInputForm from "../../general/Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import TextAreaInputForm from "../../general/Form/TextAreaInputForm";
import InputFileForm from "../../general/Form/InputFileForm";

function PaymentForm(props) {
  return (
    <Form
    successMessage={`Paiement ${props.statusMessageForm} avec succés`}
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage} une paiement`}
      isFailed={props.isFailed}
      isSuccess={props.isSuccess}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
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
      {props.pictureDisplay !== "" && (
        <div className="col-12 m-0 p-0 row d-flex justify-content-between">
          <div
            className="col-6 col-sm-4 p-2 mx-auto"
            key={props.pictureDisplay}
          >
            <img
              src={`http://localhost:5000/uploads/img/${props.pictureDisplay}`}
              className="w-100"
              alt=""
            />
          </div>
        </div>
      )}
      <DivInputForm
        label={"Titre :"}
        name="title"
        type="text"
        labelClass="col-9 col-sm-4 mt-2"
        value={props.title}
        change={(e) => {
          props.setTitle(e.target.value);
        }}
        errorcondition={props.errorTitle && props.isSubmit}
        errormessage="Ce champ doit contenir entre 3 et 30 caractères, et sans caractères spéciaux"
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
        errorFile={props.errorPicture}
        isSubmit={props.isSubmit}
        setPicture={(e) => props.setPicture(e.target.files)}
        errorMessage="Un paiement doit contenir au moins une image sous le format png ou jpg/jpeg"
        isMultiple={false}
      />
    </Form>
  );
}

export default PaymentForm;
