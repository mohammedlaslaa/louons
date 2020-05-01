import React from "react";
import { Switch, Route } from "react-router-dom";
import ListAdmin from "./ListAdmin";
import NotFound from "../../general/NotFound";

function PrivateAdmin() {
  return (
    <Switch>
      <Route exact path="/admin/admins">
        <ListAdmin />
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