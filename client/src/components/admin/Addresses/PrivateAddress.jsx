import React from "react";
import { Switch, Route } from "react-router-dom";
import ListAddress from "./ListAddress";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivateAddress() {
  return (
    <Switch>
      <Route exact path="/admin/addresses">
        <PrivateRoute component={ListAddress} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/addresses/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateAddress;