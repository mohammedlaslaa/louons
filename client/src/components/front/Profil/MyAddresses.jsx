import React, { useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import { useParams, Link } from "react-router-dom";
import TableProfil from "./TableProfil";
import AdressFormLogic from "../../general/Form/AddressFormLogic";

function MyAddresses(props) {
  // Initialize the id passed in parameter and the addresses of the user
  const idParams = useParams().id;
  const [addresses, setAddresses] = useState({
    data: [],
    isFetched: false,
    id: idParams,
  });

  useEffect(() => {
    // fetch all the addresses of the user, then store them in the adresses state
    if (!addresses.isFetched) {
      fetch("http://localhost:5000/louons/api/v1/address/allself", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setAddresses((prevState) => ({
              ...prevState,
              data: result.data,
              isFetched: true,
            }));
          }
        });
    }
    // if there are an idParams and it is not equal to the addresses.id, refresh the addresses.id state
    if (idParams !== addresses.id) {
      setAddresses((prevState) => ({ ...prevState, id: idParams }));
    }
  }, [addresses, idParams]);

  // Simple function to change the addresses.id
  const handleIdParams = (id) => {
    setAddresses((prevState) => ({ ...prevState, id }));
  };

  return (
    <>
      <TitleSection
        isMediumWindow={props.isMediumWindow}
        title="Mes Adresses"
      />
      {!addresses.id ? (
        <>
          {addresses.data.length > 0 ? (
            <TableProfil
              data={addresses.data}
              linkdetail="/my_account/addresses"
              handleIdParams={handleIdParams}
              linkapi="http://localhost:5000/louons/api/v1/address"
              setAddresses={setAddresses}
              datatodisplay={{
                title: "Titre",
                address: "Adresse",
                zipcode: "Code postal",
                city: "Ville",
                date_register: "Date d'enregistrement",
                seemore: "Voir",
                delete: "Supprimer",
              }}
            />
          ) : (
            <p>Vous n'avez pas encore d'annonces publiés</p>
          )}
          <Link to={`addresses/add`}>
            <button className="btn text-white bgcolor3c8ce4">
              Ajouter une adresse
            </button>
          </Link>
        </>
      ) : (
        <AdressFormLogic setAddresses={setAddresses} history={props.history} />
      )}
    </>
  );
}

export default MyAddresses;
