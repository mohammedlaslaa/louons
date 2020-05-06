import React from "react";
import { Switch, Route } from "react-router-dom";
import ListRental from "./ListRental";
import NotFound from "../../general/NotFound";
import RentalFormLogic from "./RentalFormLogic";

function PrivateRental() {
  return (
    <Switch>
      <Route exact path="/admin/rentals">
        <ListRental />
      </Route>
      <Route exact path="/admin/rentals/add">
        <RentalFormLogic title="Créer une" />
      </Route>
      <Route
        exact
        path="/admin/rentals/:id"
        render={(props) => <RentalFormLogic {...props} title="Modifier une" />}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateRental;
