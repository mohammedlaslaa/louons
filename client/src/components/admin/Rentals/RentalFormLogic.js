import React, { useState, useEffect } from "react";
import RentalForm from "./RentalForm";
import { useParams } from "react-router-dom";


function RentalFormLogic(props) {
  const [isSuccess, setIssuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [statusMessageForm, setStatusMessageForm] = useState("enregistré");
  const [grasp, setGrasp] = useState("");
  const [errorGrasp, setErrorGrasp] = useState(true);
  const [article, setArticle] = useState("");
  const idParams = useParams().id;

  

  useEffect(() => {}, []);

  return (
    <RentalForm
      titlepage={props.title}
      isFailed={isFailed}
      isSuccess={isSuccess}
      statusMessageForm={statusMessageForm}
      errorGrasp ={errorGrasp}
      idParams={idParams}
      grasp={grasp}
      setGrasp={setGrasp}
      setArticle={setArticle}
      setErrorGrasp={setErrorGrasp}
    />
  );
}

export default RentalFormLogic;
