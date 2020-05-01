import React from "react";

function SubmitButton(props) {
  return (
    <div className="col-12 form-group my-3">
      <input
        type="submit"
        value="Envoyer"
        className="btn text-white bgcolor3c8ce4"
      />
    </div>
  );
}

export default SubmitButton;
