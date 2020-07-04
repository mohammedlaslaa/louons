import React from "react";
import { Switch, Route } from "react-router-dom";
import ListDelivery from "ListDelivery.jsx";
import NotFound from "../../general/NotFound";
import DeliveryFormLogic from "./DeliveryFormLogic";

function PrivateDelivery() {
  return (
    <Switch>
      <Route exact path="/admin/deliveries">
        <ListDelivery />
      </Route>
      <Route exact path="/admin/deliveries/add">
        <DeliveryFormLogic title="Ajouter" />
      </Route>
      <Route
        exact
        path="/admin/deliveries/:id"
        render={(props) => <DeliveryFormLogic {...props} title="Modifier" />}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateDelivery;
