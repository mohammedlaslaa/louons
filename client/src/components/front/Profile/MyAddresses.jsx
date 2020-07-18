import React, { useEffect, useState } from "react";
import TitleSection from "./TitleSection";
import { useParams, Link } from "react-router-dom";
import TableProfil from "./TableProfil";
import AdressFormLogic from "../../general/Form/AddressFormLogic";
import Api from "../../../Classes/Api/Api";

function MyAddresses(props) {
  // Initialize the id passed in parameter and the addresses of the user
  const idParams = useParams().id;
  const [addresses, setAddresses] = useState({
    data: [],
    isFetched: false,
    isLoading: true,
    id: idParams,
  });
  const ApiLink = Api.endPoint;

  useEffect(() => {
    // fetch all the addresses of the user, then store them in the adresses state
    if (!addresses.isFetched) {
      fetch(`${ApiLink}/address/allself`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setAddresses((prevState) => ({
              ...prevState,
              data: result.data,
              isFetched: true,
              isLoading: false,
            }));
          }
        });
    }
    // if there are an idParams and it is not equal to the addresses.id, refresh the addresses.id state
    if (idParams !== addresses.id) {
      setAddresses((prevState) => ({ ...prevState, id: idParams }));
    }
  }, [addresses, idParams, ApiLink]);

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
      {isLoading ?
        (<p className="p-2 text-white bg-success">Chargement...</p>)
        : !addresses.id ? (
          <>
            {addresses.data.length > 0 ? (
              <TableProfil
                data={addresses.data}
                linkdetail="/my_account/addresses"
                handleIdParams={handleIdParams}
                linkapi={`${ApiLink}/address`}
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
                <p>Vous n'avez pas encore d'adresses publiés</p>
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
