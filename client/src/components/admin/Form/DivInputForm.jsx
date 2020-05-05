import React from "react";

function DivInputForm(props) {
  return (
    <>
      {props.errorcondition && (
        <span className="text-danger errormessage text-center mx-auto">
          {props.errormessage}
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center w-100 mx-auto">
        <label className={props.labelClass}>{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          className={props.inputClass}
          onChange={props.change}
        />
      </div>
    </>
  );
}

DivInputForm.defaultProps = {
  inputClass : "form-control col-9 col-sm-6 col-md-5",
  labelClass : "col-9 col-sm-4 mt-2"
}

export default DivInputForm;
