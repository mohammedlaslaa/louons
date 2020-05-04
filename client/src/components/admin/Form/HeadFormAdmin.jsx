import React from "react";

function HeadFormAdmin(props) {
  return (
    <>
      <h4 className="titlepage col-12">{props.titlepage}</h4>
      {props.isSuccess ? (
        <p className="bg-success text-white text-center p-2">
          {props.successMessage}
        </p>
      ) : props.isFailed ? (
        <p className="bg-danger text-white text-center p-2">
          {props.failMessage}
        </p>
      ) : (
        true
      )}
    </>
  );
}

export default HeadFormAdmin
