import React from "react";
import DivInputForm from "../../admin/Form/DivInputForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HeadFormAdmin from "../Form/HeadFormAdmin";
import AutoCompleteUserId from "../../admin/Form/AutoCompleteUserId";

function AddressForm(props) {
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
        <DivInputForm
          label={"Adresse :"}
          name="address"
          type="text"
          value={props.address}
          change={(e) => {
            props.setAddress(e.target.value);
            props.setErrorPost(false);
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
            props.setErrorPost(false);
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
            props.setErrorPost(false);
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
            props.setErrorPost(false);
          }}
          errorcondition={props.errorCountry && props.isSubmit}
          errormessage="Ce champ doit contenir entre 3 et 20 caractères, et sans caractères spéciaux ni chiffre"
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

export default AddressForm;
