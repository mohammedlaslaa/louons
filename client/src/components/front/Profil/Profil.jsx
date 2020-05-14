import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import InformationsLogic from "./InformationsLogic";
import MyAnnounces from "./MyAnnounces";
import MyAddresses from "./MyAddresses";
import MyRentals from "./MyRentals";

function Profil() {

  return (
    <div className="col-12 col-lg-10 mx-auto">
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-12 col-md-4 col-lg-3">
          <ul className="list-unstyled">
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
        </div>
        <div className="col-12 col-md-8 col-lg-9 container-myaccount">
            <Switch>
              <Route exact path="/my_account">
                <InformationsLogic />
              </Route>
              <Route exact path="/my_account/announces">
                <MyAnnounces />
              </Route>
              <Route exact path="/my_account/addresses">
                <MyAddresses />
              </Route>
              <Route exact path="/my_account/rental">
                <MyRentals />
              </Route>
            </Switch>
        </div>
      </div>
    </div>
  );
}

export default Profil;
