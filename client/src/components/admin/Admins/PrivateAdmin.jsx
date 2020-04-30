import React from "react";
import { Switch, Route } from "react-router-dom";
import ListAdmin from "./ListAdmin";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivateAdmin() {
  return (
    <Switch>
      <Route exact path="/admin/admins">
        <PrivateRoute component={ListAdmin} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/admins/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateAdmin;