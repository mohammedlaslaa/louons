import React from "react";

function InputFileForm(props) {
  return (
    <>
      {props.errorFile > 0 && props.isSubmit && (
        <span className="text-danger errormessage text-center mx-auto">
          {props.errorMessage}
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100">
        <label className="col-9 col-sm-4 mt-2">{props.label} :</label>
        <input
          type="file"
          name="file"
          reset={props.reset}
          multiple={props.isMultiple}
          className="form-control-file col-9 col-sm-6 col-md-5"
          onChange={(e) => {
            props.setPicture(e.target.files);
          }}
        />
      </div>
    </>
  );
}

InputFileForm.defaultProps = {
  label: "Images",
};

export default InputFileForm;
