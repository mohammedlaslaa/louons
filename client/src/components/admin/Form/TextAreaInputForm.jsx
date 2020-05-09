import React from "react";

function TextAreaInputForm(props) {
  return (
    <>
      {props.errorDescription && props.isSubmit && (
        <span className="text-danger errormessage text-center mx-auto">
          {props.errorMessage}
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100 mx-auto">
        <label className="col-9 col-sm-4 mt-2">{props.label}</label>
        <textarea
          type="text"
          name="description"
          rows="5"
          value={props.description}
          className="form-control col-9 col-sm-6 col-md-5"
          onChange={(e) => {
            props.setDescription(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default TextAreaInputForm;
