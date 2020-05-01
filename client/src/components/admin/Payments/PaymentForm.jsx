import React from "react";
import DivInputForm from "../Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HeadFormAdmin from "../Form/HeadFormAdmin";

function PaymentForm(props) {
  return (
    <>
      <HeadFormAdmin
        titlepage={`${props.titlepage} une adresse`}
        isFailed={props.isFailed}
        isSuccess={props.isSuccess}
        errorPost={props.errorPost}
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
          label={"Titre de l'adresse :"}
          name="title"
          type="text"
          value={props.title}
          change={(e) => {
            props.setTitle(e.target.value);
            props.setErrorPost(false);
          }}
          errorcondition={props.errorTitle && props.isSubmit}
          errormessage="Ce champ doit contenir entre 5 et 30 caractères, et sans caractères spéciaux"
        />

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

export default PaymentForm;
