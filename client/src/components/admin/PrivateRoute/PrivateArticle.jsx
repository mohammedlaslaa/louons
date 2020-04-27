import React from "react";
import { Switch, Route } from "react-router-dom";
import ListArticle from "../Articles/ListArticle";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";

function PrivateArticle() {
  return (
    <Switch>
      <Route exact path="/admin/articles">
        <PrivateRoute component={ListArticle} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/articles/add">
        <p>coucou</p>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateArticle;