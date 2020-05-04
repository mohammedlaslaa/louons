import React from "react";
import SubmitButton from "./SubmitButton";

function Form(props) {
  return (
    <form className={props.class} onSubmit={props.handleSubmit}>
      <h4 className="titlepage col-12">{props.titlepage}</h4>
      {props.isSuccess ? (
        <p className="bg-success text-white text-center p-2 w-100">
          {props.successMessage}
        </p>
      ) : props.isFailed ? (
        <p className="bg-danger text-white text-center p-2 w-100">
          {props.failMessage}
        </p>
      ) : (
        true
      )}
      {props.children}
      <SubmitButton />
    </form>
  );
}

Form.defaultProps={
    class: "row mx-auto text-center widthform py-md-2"
}

export default Form;
