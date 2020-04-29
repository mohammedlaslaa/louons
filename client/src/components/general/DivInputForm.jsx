import React from "react";

function DivInputForm(props) {
  return (
    <>
      {props.errorcondition && (
        <span className="text-danger errormessage text-center">
          {props.errormessage}
        </span>
      )}
      <div className="row form-group my-3 d-flex justify-content-center align-items-center">
        <label className="col-9 col-sm-4 mt-2">{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          className="form-control col-9 col-sm-6 col-md-5"
          onChange={props.change}
        />
      </div>
    </>
  );
}

export default DivInputForm;
