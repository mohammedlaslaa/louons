import React, { useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import TableProfil from "./TableProfil";

function MyAnnounces(props) {
  // Initialize the announces state
  const [announces, setAnnounces] = useState({
    data: [],
    isFetched: false,
  });

  useEffect(() => {
    // fetch all the announces of the user, then store them in the announces state
    if (!announces.isFetched) {
      fetch("http://localhost:5000/louons/api/v1/article/owner", {
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
  }, [announces]);

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
