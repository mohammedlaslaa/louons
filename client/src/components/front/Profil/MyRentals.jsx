import React, { useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import { useParams } from "react-router-dom";
import TableProfil from "./TableProfil";

function MyRentals(props) {
  const idParams = useParams().id;

  const [rentals, setRentals] = useState({
    data: [],
    isFetched: false,
    id: idParams,
  });

  useEffect(() => {
    if (!rentals.isFetched) {
      fetch("http://localhost:5000/louons/api/v1/rental/self", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setRentals((prevState) => ({
              ...prevState,
              data: result.data,
              isFetched: true,
            }));
          }
        });
    }
    if (idParams !== rentals.id) {
      setRentals((prevState) => ({ ...prevState, id: idParams }));
    }
  }, [rentals, idParams]);

  const handleIdParams = (id) => {
    setRentals((prevState) => ({ ...prevState, id }));
  };

  return (
    <>
      <TitleSection
        isMediumWindow={props.isMediumWindow}
        title="Mes Locations"
      />
      {rentals.data.length > 0 && !rentals.id ? (
        <TableProfil
          data={rentals.data}
          linkdetail="/my_account/rentals"
          handleIdParams={handleIdParams}
          datatodisplay={{
            rentalId: "N° de location",
            id_article: "Article",
            id_payment: "Paiement",
            id_carrier: "Livraison",
            date_register: "Date de commande",
            total_price: "Prix total",
            seemore: "Voir",
          }}
        />
      ) : rentals.id ? (
        ""
      ) : (
        <p>Vous n'avez pas encore de location</p>
      )}
    </>
  );
}

export default MyRentals;
