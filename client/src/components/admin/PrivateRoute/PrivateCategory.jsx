import React from "react";
import { Switch, Route } from "react-router-dom";
import ListCategory from "../Categories/ListCategory";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivateCategory() {
  return (
    <Switch>
      <Route exact path="/admin/categories">
        <PrivateRoute component={ListCategory} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/categories/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateCategory;
