import React from "react";
import { ListCategoryProvider } from "../../context/ListCategoryContext";
import Header from "./Header";
import Footer from "./Footer";
import NotFound from "../general/NotFound"
import { Switch, Route } from "react-router-dom";
import "../../styles/front/main.css"

function Front() {
  return (
    // Provide the category list to the app or to the component that need it
    <ListCategoryProvider>
      <Header />
      <main className="widthmain mx-auto">
        <Switch>
          <Route path="/informatique">informatique</Route>
          <Route exact path="/annonces">
            Coucou
          </Route>
          <Route exact path="/">
            Espace front test
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </main>
      <Footer />
    </ListCategoryProvider>
  );
}

export default Front;
