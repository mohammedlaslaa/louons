import React from "react";
import { Switch, Route } from "react-router-dom";
import ListDelivery from "./ListDelivery";
import NotFound from "../../general/NotFound";

function PrivateDelivery() {
  return (
    <Switch>
      <Route exact path="/admin/deliveries">
        <ListDelivery />
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
