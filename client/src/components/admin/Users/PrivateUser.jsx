import React from "react";
import { Switch, Route } from "react-router-dom";
import ListUser from "./ListUser";
import UserFormLogic from "./UserFormLogic.js";
import NotFound from "../../general/NotFound";

function PrivateUser() {
  return (
    <Switch>
      <Route exact path="/admin/users">
        <ListUser />
      </Route>
      <Route exact path="/admin/users/add">
        <UserFormLogic title="Ajouter un"/>
      </Route>
      <Route exact path="/admin/users/:id">
        <UserFormLogic title="Modifier un"/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateUser;
