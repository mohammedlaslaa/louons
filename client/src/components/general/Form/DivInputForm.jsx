import React from "react";

function DivInputForm(props) {
  return (
    <>
      <div className={props.containerClass}>
        {props.errorcondition && (
          <span className="text-danger w-100 errormessage text-center mx-auto p-2">
            {props.errormessage}
          </span>
        )}
        <label className={props.labelClass} htmlFor={props.name}>
          {props.label}
        </label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          className={props.inputClass}
          onChange={props.change}
          id={props.name}
          disabled={props.disabled}
          min={props.min}
          max={props.max}
        />
      </div>
    </>
  );
}

DivInputForm.defaultProps = {
  containerClass:
    "row form-group my-md-3 d-flex justify-content-center align-items-center w-100 mx-auto",
  inputClass: "form-control col-9 col-sm-6 col-md-5",
  labelClass: "col-9 col-sm-4 mt-2",
  disabled: false,
  htmlFor: "",
  min: "",
  max: "",
  errorCondition: false,
};

export default DivInputForm;
