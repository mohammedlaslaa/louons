import React, { useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import { useParams } from "react-router-dom";
import TableProfil from "./TableProfil";
import Rental from "./Rental";
import Api from "../../../Classes/Api/Api";

function MyRentals(props) {
  // Initialize the announces state and the idParams
  const idParams = useParams().id;
  const ApiLink = Api.endPoint;
  const [rentals, setRentals] = useState({
    data: [],
    isFetched: false,
    id: idParams,
    dataRental: {},
  });

  useEffect(() => {
    // fetch all the rentals of the user, then store them in the rentals state
    if (!rentals.isFetched) {
      fetch(`${ApiLink}/rental/self`, {
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

    // If there an rentals.id and the length of rentals.dataRental is equal to 0, fetch the data of the current rental
    if (rentals.id && Object.keys(rentals.dataRental).length === 0) {
      fetch(`${ApiLink}/rental/detail/${rentals.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setRentals((prevState) => ({
              ...prevState,
              dataRental: result.data,
            }));
          }
        });
    }

    // if there are an idParams and it is not equal to the rentals.id, refresh the rentals.id state
    if (idParams !== rentals.id) {
      setRentals((prevState) => ({ ...prevState, id: idParams, dataRental: {}}));
    }
  }, [rentals, idParams, ApiLink]);

  // Simple function to change the rentals.id
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
        <Rental datarental={rentals.dataRental} history={props.history} />
      ) : (
        <p>Vous n'avez pas encore de location</p>
      )}
    </>
  );
}

export default MyRentals;
