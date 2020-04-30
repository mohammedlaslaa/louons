import React from "react";
import { Switch, Route } from "react-router-dom";
import ListPayment from "./ListPayment";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivatePayment() {
  return (
    <Switch>
      <Route exact path="/admin/payments">
        <PrivateRoute component={ListPayment} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/payments/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivatePayment;