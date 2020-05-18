import React, { useContext, useEffect } from "react";
import Form from "../../general/Form/Form";
import DivInputForm from "../../general/Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AutoCompleteField from "../../general/Form/AutoCompleteField";
import { AuthContext } from "../../../context/AuthContext";

function AddressForm(props) {
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
      titlepage={props.titlepage && `${props.titlepage} une adresse`}
      isFailed={props.form.isFailed}
      isSuccess={props.form.isSuccess}
      successMessage={`Adresse ${props.form.statusMessageForm} avec succés`}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
      {props.history && <i
        className="ri-arrow-go-back-line go-back-my-account ri-lg position-absolute"
        onClick={() => props.history.goBack()}
      ></i>}
      {dataUser.adminLevel && (
        <>
          <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100 mx-auto">
            <label className="col-4 mt-2">Etat :</label>
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
        </>
      )}
      <DivInputForm
        label={"Titre de l'adresse :"}
        name="title"
        type="text"
        containerClass="row form-group my-md-3 d-flex justify-content-center align-items-center col-12 mx-auto mt-5"
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
        value={props.city.value}
        change={(e) => {
          props.setCity({ value: e.target.value });
        }}
        errorcondition={props.city.error && props.isSubmit}
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
