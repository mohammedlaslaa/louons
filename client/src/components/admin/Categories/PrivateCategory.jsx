import React from "react";
import { Switch, Route } from "react-router-dom";
import ListCategory from "./ListCategory";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";
import CategoryFormLogic from "./CategoryFormLogic"

function PrivateCategory() {
  return (
    <Switch>
      <Route exact path="/admin/categories">
        <PrivateRoute component={ListCategory} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/categories/:id">
        <CategoryFormLogic />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateCategory;