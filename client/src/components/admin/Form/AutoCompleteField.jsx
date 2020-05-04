import React, { useState } from "react";
import DivInputForm from "./DivInputForm";

function AutoCompleteField(props) {
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  // get the list of user depending the parameter sended by the client

  const getList = (occ) => {
    fetch(`${props.link}/${occ}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setData(result.data);
        }
      });
  };

  return (
    <div className={props.divclass}>
      {props.errorGrasp && (
        <span className="text-danger errormessage text-center">
          Veuillez saisir votre recherche en un mot en toute lettre puis
          sélectionner une proposition sur la liste déroulante
        </span>
      )}
      <div className="position-relative">
        {props.idParams ? (
          <div className="row form-group my-3 d-flex justify-content-center align-items-center">
            <label className="col-9 col-sm-4 mt-2">{props.titleLabel} :</label>
            <p className="col-9 col-sm-6 col-md-5 m-0">{props.grasp}</p>
          </div>
        ) : (
          <DivInputForm
            label={`${props.titleLabel} :`}
            name="owner"
            type="text"
            inputClass="form-control col-9 col-sm-6"
            value={props.grasp}
            change={(e) => {
              props.setGrasp(e.target.value);
              getList(e.target.value);
              setIsShow(true);
              props.setId("");
              props.setErrorGrasp(true);
            }}
          />
        )}
        {isShow && props.grasp !== "" && (
          <ul className="list-unstyled bg-secondary text-white autocomplete">
            {data.map((e) => {
              if (e.clientId) {
                return (
                  <li
                    className="p-1 border-black listcomplete"
                    key={e._id}
                    onClick={() => {
                      props.setGrasp(`${e.lastName} ${e.firstName}`);
                      setIsShow(false);
                      props.setId(e._id);
                      props.setErrorGrasp(false);
                    }}
                  >{`${e.clientId} ${e.lastName} ${e.firstName}`}</li>
                );
              } else if (e.articleId) {
                return (
                  <li
                    className="p-1 border-black listcomplete"
                    key={e._id}
                    onClick={() => {
                      props.setGrasp(`${e.title}`);
                      setIsShow(false);
                      props.setId(e._id);
                      props.setErrorGrasp(false);
                    }}
                  >{`${e.articleId} ${e.title}`}</li>
                );
              } else {
                return true;
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

AutoCompleteField.defaultProps = {
  divclass: "col-12",
};

export default AutoCompleteField;
