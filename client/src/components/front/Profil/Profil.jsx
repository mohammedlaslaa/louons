import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import PrivateRoute from "../../general/PrivateRoute";
import InformationsLogic from "./InformationsLogic";
import MyAnnounces from "./MyAnnounces";
import MyAddresses from "./MyAddresses";
import MyRentals from "./MyRentals";
// import { AuthContext } from "../../../context/AuthContext";

function Profil() {
  const [isMediumWindow, setIsMediumWindow] = useState();
  let history = useHistory();
  let isCancelled = useRef(null);

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
    
    if (!isCancelled.current) {
      handleIsMedium();
    }

    return () => {
      isCancelled.current = true;
    };
  }, [isMediumWindow]);

  window.addEventListener("resize", handleIsMedium);

  function handleChangeSelect(value) {
    history.push(`/my_account/${value}`);
  }

  return (
    <div className="col-12 col-lg-10 mx-auto">
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-12 col-md-4 col-lg-3 text-center">
          {isMediumWindow ? (
            <select
              className="custom-select w-75 mx-auto"
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              <option value="">Informations</option>
              <option value="announces">Mes Annonces</option>
              <option value="addresses">Mes Adresses</option>
              <option value="rental">Mes locations</option>
            </select>
          ) : (
            <ul className="list-unstyled mt-5">
              <Link to="/my_account" className="text-dark">
                <li className="p-2 text-center">Informations</li>
              </Link>
              <Link to="/my_account/announces" className="text-dark">
                <li className="p-2 text-center">Mes Annonces</li>
              </Link>
              <Link to="/my_account/addresses" className="text-dark">
                <li className="p-2 text-center">Mes Adresses</li>
              </Link>
              <Link to="/my_account/rental" className="text-dark">
                <li className="p-2 text-center">Mes locations</li>
              </Link>
              <Link to="/logout" className="text-dark">
                <li className="p-2 text-center text-danger">Déconnexion</li>
              </Link>
            </ul>
          )}
        </div>
        <div className="col-12 col-md-8 col-lg-9 container-myaccount">
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
            <Route exact path="/my_account/addresses">
              <PrivateRoute
                isMediumWindow={isMediumWindow}
                component={MyAddresses}
                pageifnotauth="/login"
                linkAuth="http://localhost:5000/louons/api/v1/authenticationuser"
              />
            </Route>
            <Route exact path="/my_account/rental">
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
