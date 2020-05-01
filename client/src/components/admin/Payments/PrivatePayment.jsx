import React from "react";
import { Switch, Route } from "react-router-dom";
import ListPayment from "./ListPayment";
import NotFound from "../../general/NotFound";
import PaymentFormLogic from "./PaymentFormLogic"

function PrivatePayment() {
  return (
    <Switch>
      <Route exact path="/admin/payments">
        <ListPayment />
      </Route>
      <Route exact path="/admin/payments/add">
        <PaymentFormLogic  title="Ajouter"/>
      </Route>
      <Route exact path="/admin/payments/:id">
        <PaymentFormLogic  title="Modifier"/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivatePayment;
