import React from "react";
import Form from "../Form/Form";
import DivInputForm from "../../admin/Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AutoCompleteField from "../../admin/Form/AutoCompleteField";

function AddressForm(props) {
  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage}  une adresse`}
      isFailed={props.isFailed}
      isSuccess={props.isSuccess}
      successMessage={`Location ${props.statusMessageForm} avec succés`}
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
      <DivInputForm
        label={"Titre de l'adresse :"}
        name="title"
        type="text"
        value={props.title}
        change={(e) => {
          props.setTitle(e.target.value);
        }}
        errorcondition={props.errorTitle && props.isSubmit}
        errormessage="Ce champ doit contenir entre 5 et 30 caractères, et sans caractères spéciaux"
      />
      <DivInputForm
        label={"Adresse :"}
        name="address"
        type="text"
        value={props.address}
        change={(e) => {
          props.setAddress(e.target.value);
        }}
        errorcondition={props.errorAddress && props.isSubmit}
        errormessage="Ce champ doit contenir entre 10 et 80 caractères, et sans caractères spéciaux"
      />
      <DivInputForm
        label={"Code postal :"}
        name="zipcode"
        type="number"
        value={props.zipCode}
        change={(e) => {
          props.setZipCode(e.target.value);
        }}
        errorcondition={props.errorZipCode && props.isSubmit}
        errormessage="Ce champ doit contenir entre 4 et 5 caractères numériques"
      />
      <DivInputForm
        label={"Ville :"}
        name="city"
        type="text"
        value={props.city}
        change={(e) => {
          props.setCity(e.target.value);
        }}
        errorcondition={props.errorCity && props.isSubmit}
        errormessage="Ce champ doit contenir entre 3 et 50 caractères, et sans caractères spéciaux ni chiffre"
      />
      <DivInputForm
        label={"Pays :"}
        name="country"
        type="text"
        value={props.country}
        change={(e) => {
          props.setCountry(e.target.value);
        }}
        errorcondition={props.errorCountry && props.isSubmit}
        errormessage="Ce champ doit contenir entre 3 et 20 caractères, et sans caractères spéciaux ni chiffre"
      />
    </Form>
  );
}

export default AddressForm;
