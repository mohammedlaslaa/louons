import React from "react";
import { Switch, Route } from "react-router-dom";
import ListAdmin from "./ListAdmin";
import NotFound from "../../general/NotFound";
import PrivateAccessSuperAdmin from "../PrivateAccessSuperAdmin";
import AdminFormLogic from "./AdminFormLogic";

function PrivateAdmin() {
  return (
    <Switch>
      <Route exact path="/admin/admins">
        <PrivateAccessSuperAdmin component={ListAdmin} />
      </Route>
      <Route exact path="/admin/admins/add">
        <PrivateAccessSuperAdmin title="Ajouter" component={AdminFormLogic} />
      </Route>
      <Route exact path="/admin/admins/:id">
        <PrivateAccessSuperAdmin title="Modifier" component={AdminFormLogic} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateAdmin;
