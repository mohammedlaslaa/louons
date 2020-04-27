import React from "react";
import { Switch, Route } from "react-router-dom";
import ListUser from "../Users/ListUser";
import UserFormLogic from "../Users/UserFormLogic.js";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivateUser() {
  return (
    <Switch>
      <Route exact path="/admin/users">
        <PrivateRoute component={ListUser} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/users/add">
        <UserFormLogic title="Ajouter"/>
      </Route>
      <Route exact path="/admin/users/:id">
        <UserFormLogic title="Modifier"/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateUser;
