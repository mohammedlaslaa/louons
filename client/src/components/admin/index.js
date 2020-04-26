import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import ListCategory from "./Categories/ListCategory";
import ListUser from "./Users/ListUser";
import ListArticle from "./Articles/ListArticle";
import ListRental from "./Rentals/ListRental";
import ListAddress from "./Addresses/ListAddress";
import ListPayment from "./Payments/ListPayment";
import ListDelivery from "./Deliveries/LIstDelivery";
import ListAdmin from "./Admins/ListAdmin";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer.jsx";
import NotFound from "../general/NotFound";
import PrivateRoute from "../general/PrivateRoute";
import "../../styles/admin/global.css";
import "../../styles/admin/main.css";
import { ToggleMenuProvider } from "../../context/TogglerMenuContext";



function Admin() {
  // This routes are only accessible when the user is logged in (PrivateRoute)

  return (
    <ToggleMenuProvider>
      <Header />
      <main className="row">
        <Menu />
        <div className="col-12 col-lg-9">
          <Switch>
            <Route exact path="/admin/home">
              <PrivateRoute component={Home} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/categories">
              <PrivateRoute
                component={ListCategory}
                pageifnotauth="/adminlogin"
              />
            </Route>
            <Route exact path="/admin/users">
              <PrivateRoute component={ListUser} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/articles">
              <PrivateRoute component={ListArticle} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/rentals">
              <PrivateRoute component={ListRental} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/addresses">
              <PrivateRoute component={ListAddress} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/payments">
              <PrivateRoute component={ListPayment} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/deliveries">
              <PrivateRoute component={ListDelivery} pageifnotauth="/adminlogin" />
            </Route>
            <Route exact path="/admin/admins">
              <PrivateRoute component={ListAdmin} pageifnotauth="/adminlogin" />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </main>
      <Footer />
    </ToggleMenuProvider>
  );
}

export default Admin;
