import React, { useEffect, useContext } from "react";
import { ListCategoryProvider } from "../../context/ListCategoryContext";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Product from "./Product";
import Category from "./Category";
import AllProduct from "./AllProduct";
import NotFound from "../general/NotFound";
import Rental  from "./Rental";
import Login from "../general/Login";
import Logout from "../general/Logout";
import Profile from "./Profile/Profile";
import UserFormLogic from "../general/Form/UserFormLogic";
import PrivateRoute from "../general/PrivateRoute";
import ArticleFormLogic from "../general/Form/ArticleFormLogic";
import { Switch, Route } from "react-router-dom";
import "../../styles/front/main.css";
import { AuthContext } from "../../context/AuthContext";
import Api from '../../Classes/Api/Api.js';

function Front() {
  const { setLinkAuth } = useContext(AuthContext);
  const ApiLink = Api.endPoint;

  // set the path authentication

  useEffect(() => {
    setLinkAuth(`${ApiLink}/authenticationuser`);
  }, [setLinkAuth, ApiLink]);

  return (
    // Provide the category list to the app or to the component that need it
    <ListCategoryProvider>
        <Header />
        <main className="row widthmain mx-auto">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/announces" render={() => <AllProduct />} />
            <Route exact path="/announce/:id" render={() => <Product />} />
            <Route
              exact
              path="/categories/:title"
              render={(props) => <Category {...props} />}
            />
            <Route path="/my_account">
              <PrivateRoute
                component={Profile}
                pageifnotauth="/login"
                linkAuth={`${ApiLink}/authenticationuser`}
              />
            </Route>
            <Route exact path="/post_announce">
              <PrivateRoute
                component={ArticleFormLogic}
                pageifnotauth="/login"
                linkAuth={`${ApiLink}/authenticationuser`}
              />
            </Route>
            <Route
              exact
              path="/inscription"
              render={(props) => <UserFormLogic {...props} />}
            />
            <Route
              exact
              path="/order"
            >
              <PrivateRoute
                component={Rental}
                pageifnotauth="/login"
                linkAuth={`${ApiLink}/authenticationuser`}
              />
            </Route>
            <Route
              exact
              path="/logout"
              render={(props) => <Logout {...props} redirect="/" />}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  linkapi={`${ApiLink}/authenticationuser`}
                  redirect="/my_account"
                  {...props}
                />
              )}
            />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
        <div className="fill"></div>
        <Footer />
    </ListCategoryProvider>
  );
}

export default Front;
