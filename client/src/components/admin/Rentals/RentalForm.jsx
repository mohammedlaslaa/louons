import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import AutoCompleteField from "../../admin/Form/AutoCompleteField";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import DivInputForm from "../Form/DivInputForm";
import LiForm from "../Form/LiForm";
import moment from "moment";

function RentalForm(props) {
  const [currLi, setCurrLi] = useState("");

  useEffect(() => {
    if (props.isSubmit) {
      setCurrLi("");
    }
  }, [props.isSubmit]);
  
  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage} location`}
      isFailed={props.isFailed}
      class="row m-0 mx-auto col-12 col-xl-10 text-center py-md-2"
      isSuccess={props.isSuccess}
      successMessage={`Location ${props.statusMessageForm} avec succés`}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
      {props.idParams && (
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
      <div className="row m-0 d-flex align-items-center w-100 mx-auto">
        <AutoCompleteField
          errorGrasp={props.errorGraspArticle && props.isSubmit}
          idParams={props.idParams}
          grasp={props.graspArticle}
          titleLabel="Article"
          divclass="col-12 col-sm-8 col-lg-6 mx-auto"
          setGrasp={props.setGraspArticle}
          setId={props.setIdArticle}
          setErrorGrasp={props.setErrorGraspArticle}
          setSpec={props.reset}
          link="http://localhost:5000/louons/api/v1/article"
        />
        <div className="row m-0 col-6 col-lg-3 mx-auto p-0">
          <label className="col-9 col-sm-6 mx-auto p-0">Prix /jr :</label>
          <p className="col-9 col-sm-6 mx-auto p-0 text-danger">{`${props.pricePerDay} €`}</p>
        </div>
        <div className="row m-0 col-6 col-lg-3 mx-auto p-0">
          <label className="col-9 col-sm-6 mx-auto p-0 ">Prix Total :</label>
          <p className="col-9 col-sm-6 mx-auto p-0 text-danger font-weight-bold">{`${props.totalPrice} €`}</p>
        </div>
      </div>
      {props.idParams ? (
        <div className="row m-0 d-flex align-items-center w-100 mx-auto">
          <div className="row m-0 col-6 col-lg-3 mx-auto p-0">
            <label className="col-9 col-sm-6 mx-auto p-0">
              Date de début :
            </label>
            <p className="col-9 col-sm-6 mx-auto p-0">
              {moment(props.dateStart).format("DD-MM-YYYY")}
            </p>
          </div>
          <div className="row m-0 col-6 col-lg-3 mx-auto p-0">
            <label className="col-9 col-sm-6 mx-auto p-0">Date de fin :</label>
            <p className="col-9 col-sm-6 mx-auto p-0">
              {moment(props.dateEnd).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      ) : (
        <DivInputForm
          label={"Nombre de jour de location :"}
          name="numberday"
          type="number"
          value={props.numberListDate}
          change={(e) => {
            props.setNumberListDate(e.target.value);
            if (parseInt(e.target.value) === 0 || e.target.value === "") {
              props.reset();
            }
          }}
          errorcondition={props.errorNumberListDate && props.isSubmit}
          errormessage="Le nombre de jour doit être supérieur à 0"
          inputClass="form-control col-9 col-sm-3 col-md-1"
          labelClass="col-9 col-sm-7"
        />
      )}

      {!props.errorNumberListDate &&
        !props.errorGraspArticle &&
        props.errorDate &&
        props.isSubmit && (
          <span className="text-danger errormessage text-center w-100 p-2">
            Veuillez sélectionner une date
          </span>
        )}
      <div className="row m-0 d-flex align-items-center w-100 mx-auto">
        <ul className="list-unstyled mx-auto">
          {props.listDate.length > 0 &&
            props.listDate.map((elt, index) => {
              return (
                <LiForm
                  key={index}
                  index={index}
                  className={currLi === index ? "bg-secondary text-white" : ""}
                  setCurrLi={setCurrLi}
                  dateStart={elt.dateStart}
                  dateEnd={elt.dateEnd}
                  setDateStart={props.setDateStart}
                  setDateEnd={props.setDateEnd}
                />
              );
            })}
        </ul>
      </div>
      <div className="row m-0 d-flex align-items-center w-100 mx-auto">
        {props.errorSameUser && props.isSubmit && (
          <span className="text-danger errormessage text-center w-100">
            Erreur le propriétaire de l'article ne peut pas être le locataire
          </span>
        )}
        <div className="row m-0 col-12 col-md-6 align-items-center">
          <label className="mx-auto col-9 col-sm-6">Propriétaire :</label>
          <p className="mx-auto col-9 col-sm-6 col-md-5 m-0">{props.owner}</p>
        </div>
        <AutoCompleteField
          errorGrasp={props.errorGraspTenant && props.isSubmit}
          idParams={props.idParams}
          grasp={props.graspTenant}
          titleLabel="Locataire"
          divclass="col-12 col-md-6"
          setGrasp={props.setGraspTenant}
          setId={props.setIdTenant}
          setErrorGrasp={props.setErrorGraspTenant}
          link="http://localhost:5000/louons/api/v1/user/all"
        />
      </div>
      {props.errorDelivery && props.isSubmit && (
        <span className="text-danger errormessage text-center w-100">
          Veuillez sélectionner un moyen de transport
        </span>
      )}
      <div className="row m-0 form-group my-3 d-flex justify-content-center align-items-center w-100 mx-auto">
        <label className="col-9 col-sm-4 mt-2">Transport :</label>
        <select
          name="id_delivery"
          id="delivery"
          className="p-1 col-9 col-sm-6 col-md-5"
          value={props.idDelivery}
          onChange={(e) => props.setIdDelivery(e.target.value)}
        >
          <option value="">--Transport--</option>
          {props.deliveries.map((elt) => (
            <option key={elt._id} value={elt._id}>
              {elt.title}
            </option>
          ))}
        </select>
      </div>
      {props.errorPayment && props.isSubmit && (
        <span className="text-danger errormessage text-center w-100">
          Veuillez sélectionner un paiement
        </span>
      )}
      <div className="row m-0 form-group my-3 d-flex justify-content-center align-items-center w-100 mx-auto">
        <label className="col-9 col-sm-4 mt-2">Paiement :</label>
        <select
          name="id_payment"
          id="payment"
          className="p-1 col-9 col-sm-6 col-md-5"
          value={props.idPayment}
          onChange={(e) => props.setIdPayment(e.target.value)}
        >
          <option value="">--Paiement--</option>
          {props.payments.map((elt) => (
            <option key={elt._id} value={elt._id}>
              {elt.title}
            </option>
          ))}
        </select>
      </div>
    </Form>
  );
}

export default RentalForm;
