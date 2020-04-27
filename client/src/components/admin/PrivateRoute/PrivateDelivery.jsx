import React from "react";
import { Switch, Route } from "react-router-dom";
import ListDelivery from "../Deliveries/ListDelivery";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivateDelivery() {
  return (
    <Switch>
      <Route exact path="/admin/deliveries">
        <PrivateRoute component={ListDelivery} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/deliveries/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateDelivery;
