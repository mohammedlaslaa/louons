import React from "react";
import moment from "moment";
import Form from "../Form/Form";
import AutoCompleteField from "../../admin/Form/AutoCompleteField";

function RentalForm(props) {
  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage} location`}
      isFailed={props.isFailed}
      class="row mx-auto col-12 col-sm-10 text-center py-md-2"
      isSuccess={props.isSuccess}
      successMessage={`Location ${props.statusMessageForm} avec succés`}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
      <div className="row d-flex align-items-center w-100">
        <AutoCompleteField
          errorGrasp={props.errorGraspArticle && props.isSubmit}
          idParams={props.idParams}
          grasp={props.graspArticle}
          titleLabel="Article"
          divclass="col-12 col-sm-6"
          setGrasp={props.setGraspArticle}
          setId={props.setIdArticle}
          setErrorGrasp={props.setErrorGraspArticle}
          link="http://localhost:5000/louons/api/v1/article"
        />
        <div className="row col-12 col-sm-6">
          <label className="col-9 col-sm-6">Prix :</label>
          <p className="col-9 col-sm-6">{`${props.totalPrice} €`}</p>
        </div>
      </div>
      <div className="row d-flex align-items-center w-100">
        {props.errorSameUser && props.isSubmit && (
          <span className="text-danger errormessage text-center w-100">
            Erreur le propriétaire de l'article ne peut pas être le locataire
          </span>
        )}
        <div className="row col-12 col-sm-6 align-items-center">
          <label className="col-9 col-sm-6">Propriétaire :</label>
          <p className="col-9 col-sm-6 col-md-5 m-0">{props.owner}</p>
        </div>
        <AutoCompleteField
          errorGrasp={props.errorGraspTenant && props.isSubmit}
          idParams={props.idParams}
          grasp={props.graspTenant}
          titleLabel="Locataire"
          divclass="col-12 col-sm-6"
          setGrasp={props.setGraspTenant}
          setId={props.setIdTenant}
          setErrorGrasp={props.setErrorGraspTenant}
          link="http://localhost:5000/louons/api/v1/user/all"
        />
      </div>
      <div className="row d-flex align-items-center w-100">
        <div className="row col-12 col-sm-6 form-group my-3 d-flex justify-content-center align-items-center w-100">
          <label className="col-9 col-sm-5 mt-2">Début de location :</label>
          <input
            type="date"
            name="dateStart"
            min={moment(new Date()).format("YYYY-MM-DD")}
            max={moment(new Date().setFullYear(new Date().getFullYear() + 1)).format("YYYY-MM-DD")}
            value={
              props.dateStart && moment(props.dateStart).format("YYYY-MM-DD")
            }
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              if (e.target.value === "") {
                props.setDateStart("");
              } else {
                props.setDateStart(e.target.value);
              }
            }}
          />
        </div>

        <div className="row col-12 col-sm-6 form-group my-3 d-flex justify-content-center align-items-center w-100">
          <label className="col-9 col-sm-5 mt-2">Fin de location :</label>
          <input
            type="date"
            name="dateEnd"
            min={moment(new Date()).format("YYYY-MM-DD")}
            max={moment(new Date().setFullYear(new Date().getFullYear() + 1)).format("YYYY-MM-DD")}
            value={
              props.dateEnd && moment(props.dateEnd).format("YYYY-MM-DD")
            }
            className="form-control col-9 col-sm-6 col-md-5"
            onChange={(e) => {
              if (e.target.value === "") {
                props.setDateEnd("");
              } else {
                props.setDateEnd(e.target.value);
              }
            }}
          />
        </div>
      </div>
      {props.errorDelivery && props.isSubmit && (
        <span className="text-danger errormessage text-center w-100">
          Veuillez sélectionner un moyen de transport
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
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
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
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
