import React, { useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import TableProfil from "./TableProfil";
import Api from "../../../Classes/Api/Api";

function MyAnnounces(props) {
  // Initialize the announces state
  const [announces, setAnnounces] = useState({
    data: [],
    isFetched: false,
  });

  const ApiLink = Api.endPoint;

  useEffect(() => {
    // fetch all the announces of the user, then store them in the announces state
    if (!announces.isFetched) {
      fetch(`${ApiLink}/article/owner`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setAnnounces((prevState) => ({
              ...prevState,
              data: result.data,
              isFetched: true,
            }));
          } else if (result.error) {
          }
        });
    }
  }, [announces, ApiLink]);

  return (
    <>
      <TitleSection
        isMediumWindow={props.isMediumWindow}
        title="Mes Annonces"
      />
      {announces.data.length > 0 ? (
        <TableProfil
          data={announces.data}
          linkdetail="/announce"
          datatodisplay={{
            title: "Titre",
            date_register: "Date d'enregistrement",
            price: "Tarif",
            seemore: "Voir",
          }}
        />
      ) : (
          <p>Vous n'avez pas encore d'annonces publiés</p>
        )}
    </>
  );
}

export default MyAnnounces;
