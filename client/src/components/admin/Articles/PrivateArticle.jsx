import React from "react";
import { Switch, Route } from "react-router-dom";
import ListArticle from "./ListArticle";
import PrivateRoute from "../../general/PrivateRoute";
import NotFound from "../../general/NotFound";
import ArticleFormLogic from "./ArticleFormLogic.js";

function PrivateArticle() {
  return (
    <Switch>
      <Route exact path="/admin/articles">
        <PrivateRoute component={ListArticle} pageifnotauth="/adminlogin" />
      </Route>
      <Route exact path="/admin/articles/add">
        <ArticleFormLogic title="Ajouter" />
      </Route>
      <Route exact path="/admin/articles/:id">
        <ArticleFormLogic title="Modifier"/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateArticle;
