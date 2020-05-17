import React from "react";

function TitleSection(props) {
  return (
    !props.isMediumWindow && (
      <h3 className="title-profil text-center mb-4">{props.title}</h3>
    )
  );
}

export default TitleSection;
