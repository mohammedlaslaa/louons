import React from "react";
import { ListCategoryProvider } from "../../context/ListCategoryContext";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Product from "./Product";
import Category from "./Category";
import AllProduct from "./AllProduct";
import NotFound from "../general/NotFound";
import { Switch, Route } from "react-router-dom";
import "../../styles/front/main.css";

function Front() {
  return (
    // Provide the category list to the app or to the component that need it
    <ListCategoryProvider>
      <Header />
      <main className="row widthmain mx-auto">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            exact
            path="/announces"
            render={() => <AllProduct />}
          />
          <Route
            exact
            path="/announce/:id"
            render={() => <Product />}
          />
          <Route
            exact
            path="/categories/:title"
            render={(props) => <Category {...props} />}
          />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </ListCategoryProvider>
  );
}

export default Front;
