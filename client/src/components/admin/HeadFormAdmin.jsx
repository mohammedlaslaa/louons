import React from "react";

function HeadFormAdmin(props) {
  return (
    <>
      <h4 className="titlepage">{props.titlepage}</h4>
      {props.successMessage ? (
        <p className="bg-success text-white text-center p-2">
          Modification enregistré avec succés
        </p>
      ) : props.isFailed ? (
        <p className="bg-danger text-white text-center p-2">
          Erreur de duplication ou champ vide
        </p>
      ) : (
        true
      )}
      {props.errorPost && (
        <p className="bg-danger text-white text-center p-2">
          Aucun champ ne peut être vide ou erreur de duplication
        </p>
      )}
    </>
  );
}

export default HeadFormAdmin
