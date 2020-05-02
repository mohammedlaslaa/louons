import React from "react";

function InputFileForm(props) {
  return (
    <>
      {props.errorFile > 0 && props.isSubmit && (
        <span className="text-danger errormessage text-center">
         {props.errorMessage}
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center">
        <label className="col-9 col-sm-4 mt-2">Images :</label>
        <input
          type="file"
          name="file"
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

export default InputFileForm