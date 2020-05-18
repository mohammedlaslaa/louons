import React from "react";
import { Switch, Route } from "react-router-dom";
import ListUser from "./ListUser";
import UserFormLogic from "../../general/Form/UserFormLogic.js";
import NotFound from "../../general/NotFound";

function PrivateUser() {
  return (
    <Switch>
      <Route exact path="/admin/users">
        <ListUser />
      </Route>
      <Route exact path="/admin/users/add">
        <UserFormLogic title="Ajouter un" />
      </Route>
      <Route
        exact
        path="/admin/users/:id"
        render={(props) => <UserFormLogic {...props} title="Modifier un" />}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateUser;
