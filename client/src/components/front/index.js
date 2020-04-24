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
          <main className="w-75 mx-auto">informatique</main>
        </Route>
        <Route path="/annonces">
          <main>Coucou</main>
        </Route>
        <Route exact path="/">
          <main className="w-75 mx-auto">
            Espace front test
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </main>
        </Route>
        <Route>
          <main className="w-75 mx-auto">Not found</main>
        </Route>
      </Switch>
      <Footer />
    </ListCategoryProvider>
  );
}

export default Front;
