import React from "react";

function TextAreaInputForm(props) {
  return (
    <>
      {props.errorDescription && props.isSubmit && (
        <span className="text-danger errormessage text-center">
          Ce champ doit contenir entre 10 et 250 caractères
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center">
        <label className="col-9 col-sm-4 mt-2">Description :</label>
        <textarea
          type="text"
          name="description"
          rows="6"
          value={props.description}
          className="form-control col-9 col-sm-6 col-md-5"
          onChange={(e) => {
            props.setDescription;
            props.setErrorPost;
          }}
        />
      </div>
    </>
  );
}

export default TextAreaInputForm;
