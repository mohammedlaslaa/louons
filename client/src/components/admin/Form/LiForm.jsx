import React from "react";
import moment from "moment";

function LiForm(props) {
  return (
    <li
      className={`listcomplete p-2 ${props.className}`}
      onClick={() => {
        props.setCurrLi();
        props.setDateStart();
        props.setDateEnd();
      }}
    >{`Du ${moment(props.dateStart).format("DD/MM/YYYY")} au ${moment(
      props.dateEnd
    ).format("DD/MM/YYYY")}`}</li>
  );
}

export default LiForm;
