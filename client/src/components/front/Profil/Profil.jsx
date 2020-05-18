import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "../../general/PrivateRoute";
import InformationsLogic from "./InformationsLogic";
import MyAnnounces from "./MyAnnounces";
import MyAddresses from "./MyAddresses";
import MyRentals from "./MyRentals";

function Profil() {
  const [isMediumWindow, setIsMediumWindow] = useState();
  const [valueSelect, setValueSelect] = useState();
  let history = useHistory();
  let isCancelled = useRef(null);

  // set the isMediumWindow depending the width of the window
  const handleIsMedium = () => {
    if (!isCancelled.current) {
      if (window.innerWidth < 768) {
        setIsMediumWindow(true);
      } else {
        setIsMediumWindow(false);
      }
    }
  };

  useEffect(() => {
    isCancelled.current = false;

    //handleIsMedium only when the isCancelled.current is settled to false
    if (!isCancelled.current) {
      handleIsMedium();
    }

    // cleanup the effect when the component is unmounted
    return () => {
      isCancelled.current = true;
    };
  }, [isMediumWindow]);

  // add an event listener on resize
  window.addEventListener("resize", handleIsMedium);

  // when this function is call change the value of the select state
  function handleChangeSelect(value) {
    setValueSelect(value);
    if (value === "logout") {
      history.push(`/${value}`);
    } else {
      history.push(`/my_account/${value}`);
    }
  }

  return (
    <div className="col-12 col-lg-10 mx-auto">
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-12 col-md-4 col-lg-3 text-center">
          {isMediumWindow ? (
            <select
              className="custom-select w-75 mx-auto"
              value={valueSelect}
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              <option value="">Informations</option>
              <option value="announces">Mes Annonces</option>
              <option value="addresses">Mes Adresses</option>
              <option value="rentals">Mes locations</option>
            </select>
          ) : (
            <ul className="list-unstyled mt-5">
              <li
                className="p-2 text-center menu-link-account"
                onClick={() => handleChangeSelect("")}
              >
                Informations
              </li>
              <li
                className="p-2 text-center menu-link-account"
                onClick={() => handleChangeSelect("announces")}
              >
                Mes Annonces
              </li>
              <li
                className="p-2 text-center menu-link-account"
                onClick={() => handleChangeSelect("addresses")}
              >
                Mes Adresses
              </li>
              <li
                className="p-2 text-center menu-link-account"
                onClick={() => handleChangeSelect("rentals")}
              >
                Mes locations
              </li>
              <li
                className="p-2 text-center text-danger menu-link-account"
                onClick={() => handleChangeSelect("logout")}
              >
                Déconnexion
              </li>
            </ul>
          )}
        </div>
        <div className="col-12 col-md-8 col-lg-9 container-myaccount p-0 position-relative">
          <Switch>
            <Route exact path="/my_account">
              <PrivateRoute
                isMediumWindow={isMediumWindow}
                component={InformationsLogic}
                pageifnotauth="/login"
                linkAuth="http://localhost:5000/louons/api/v1/authenticationuser"
              />
            </Route>
            <Route exact path="/my_account/announces">
              <PrivateRoute
                isMediumWindow={isMediumWindow}
                component={MyAnnounces}
                pageifnotauth="/login"
                linkAuth="http://localhost:5000/louons/api/v1/authenticationuser"
              />
            </Route>
            <Route exact path="/my_account/addresses/:id?">
              <PrivateRoute
                isMediumWindow={isMediumWindow}
                component={MyAddresses}
                pageifnotauth="/login"
                linkAuth="http://localhost:5000/louons/api/v1/authenticationuser"
              />
            </Route>
            <Route exact path="/my_account/rentals/:id?">
              <PrivateRoute
                isMediumWindow={isMediumWindow}
                component={MyRentals}
                pageifnotauth="/login"
                linkAuth="http://localhost:5000/louons/api/v1/authenticationuser"
              />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Profil;
