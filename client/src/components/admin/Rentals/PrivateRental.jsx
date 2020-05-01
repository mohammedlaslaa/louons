import React from "react";
import { Switch, Route } from "react-router-dom";
import ListRental from "./ListRental";
import NotFound from "../../general/NotFound";

function PrivateRental() {
  return (
    <Switch>
      <Route exact path="/admin/rentals">
        <ListRental />
      </Route>
      <Route exact path="/admin/rentals/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateRental;
