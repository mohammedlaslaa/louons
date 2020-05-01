import React, { useState } from "react";
import DivInputForm from "./DivInputForm";

function AutoCompleteUser(props) {
  const [users, setUsers] = useState([]);
  // get the list of user depending the parameter sended by the client

  const getList = (occ) => {
    fetch(`http://localhost:5000/louons/api/v1/user/all/${occ}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setUsers(result.data);
        }
      });
  };

  return (
    <>
      {props.errorGrasp && (
        <span className="text-danger errormessage text-center">
          Veuillez saisir le nom ou le prénom de l'utilisateur en toute lettre
          et le sélectionner sur la liste déroulante
        </span>
      )}
      <div className="position-relative">
        {props.idParams ? (
          <div className="row form-group my-3 d-flex justify-content-center align-items-center">
            <label className="col-9 col-sm-4 mt-2">Propriétaire :</label>
            <p className="col-9 col-sm-6 col-md-5 m-0">{props.grasp}</p>
          </div>
        ) : (
          <DivInputForm
            label={"Propriétaire :"}
            name="owner"
            type="text"
            value={props.grasp}
            change={(e) => {
              props.setGrasp(e.target.value);
              getList(e.target.value);
              props.setIsShow(true);
              props.setOwner("");
              props.setErrorGrasp(true);
            }}
          />
        )}
        {props.isShow && props.grasp !== "" && (
          <ul className="list-unstyled bg-white autocomplete">
            {users.map((e) => (
              <li
                className="p-1 border-black listcomplete"
                key={e._id}
                onClick={() => {
                  props.setGrasp(`${e.lastName} ${e.firstName}`);
                  props.setIsShow(false);
                  props.setOwner(e._id);
                  props.setErrorGrasp(false);
                }}
              >{`${e.clientId} ${e.lastName} ${e.firstName}`}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AutoCompleteUser;
