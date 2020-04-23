import React from "react";
import { ListCategoryProvider } from "../../context/ListCategoryContext";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route } from "react-router-dom";

function Front() {
  return (
    // Provide the category list to the app or to the component that need it

    <ListCategoryProvider>
      <Header />
      <Switch>
        <Route path="/informatique">
          <h1>informatique</h1>
        </Route>
        <Route path="/annonces">
          <h1>Coucou</h1>
        </Route>
        <Route exact path="/">
          <h1>Espace front test</h1>
        </Route>
        <Route >
          <h1>Not found</h1>
        </Route>
      </Switch>
      <Footer />
    </ListCategoryProvider>
  );
}

export default Front;
