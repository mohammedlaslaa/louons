import React from "react";

function SubmitButton(props) {
  return (
    <div className={props.divClass}>
      <input type="submit" value="Envoyer" className={props.inputClass} />
    </div>
  );
}

SubmitButton.defaultProps = {
  divClass: "col-12 form-group my-3",
  inputClass: "btn text-white bgcolor3c8ce4",
};

export default SubmitButton;
