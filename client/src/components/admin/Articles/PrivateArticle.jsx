import React from "react";
import { Switch, Route } from "react-router-dom";
import ListArticle from "./ListArticle";
import NotFound from "../../general/NotFound";
import ArticleFormLogic from "./ArticleFormLogic.js";

function PrivateArticle() {
  return (
    <Switch>
      <Route exact path="/admin/articles">
        <ListArticle />
      </Route>
      <Route exact path="/admin/articles/add">
        <ArticleFormLogic title="Ajouter" />
      </Route>
      <Route
        exact
        path="/admin/articles/:id"
        render={(props) => <ArticleFormLogic {...props} title="Modifier" />}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateArticle;
