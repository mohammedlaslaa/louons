import React from "react";
import DivInputForm from "../Form/DivInputForm";
import Form from "../Form/Form";
import AutoCompleteUserId from "../../admin/Form/AutoCompleteUserId";

function RentalForm(props) {
  return (
    <Form
      handleSubmit={props.handleSubmit}
      titlepage={`${props.titlepage} location`}
      isFailed={props.isFailed}
      isSuccess={props.isSuccess}
      successMessage={`Location ${props.statusMessageForm} avec succés`}
      failMessage="Erreur de duplication ou champs vide, veuillez vérifier votre formulaire"
    >
      <AutoCompleteUserId
        errorGrasp={props.errorGrasp}
        idParams={props.idParams}
        grasp={props.grasp}
        titleLabel="Article"
        divclass="col-6"
        setGrasp={props.setGrasp}
        setId={props.setArticle}
        setErrorGrasp={props.setErrorGrasp}
        link="http://localhost:5000/louons/api/v1/article"
      />
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
        <label className="col-9 col-sm-4 mt-2">Prix :</label>
        <p className="col-9 col-sm-6 col-md-5 m-0">{props.price}</p>
      </div>
    </Form>
  );
}

export default RentalForm;
