import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import PrivateUser from "./Users/PrivateUser";
import PrivateCategory from "./Categories/PrivateCategory";
import PrivateArticle from "./Articles/PrivateArticle";
import PrivateRental from "./Rentals/PrivateRental";
import PrivateAddress from "./Addresses/PrivateAddress";
import PrivatePayment from "./Payments/PrivatePayment";
import PrivateDelivery from "./Deliveries/PrivateDelivery";
import PrivateAdmin from "./Admins/PrivateAdmin";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer.jsx";
import NotFound from "../general/NotFound";
import PrivateRoute from "../general/PrivateRoute";
import "../../styles/admin/global.css";
import "../../styles/admin/main.css";
import { TogglerProvider } from "../../context/TogglerContext";
import { PopupAddProvider } from "../../context/PopupAddContext";

function Admin() {
  // This routes are only accessible when the user is logged in (PrivateRoute)

  return (
    <TogglerProvider>
      <Header />
      <main className="row">
        <Menu />
        <div className="col-12 col-lg-9">
          <Switch>
            <PopupAddProvider>
              <Route exact path="/admin">
                <PrivateRoute component={Home} pageifnotauth="/adminlogin" />
              </Route>
              <Route path="/admin/users">
                <PrivateUser />
              </Route>
              <Route path="/admin/categories">
                <PrivateCategory />
              </Route>
              <Route path="/admin/articles">
                <PrivateArticle />
              </Route>
              <Route path="/admin/rentals">
                <PrivateRental />
              </Route>
              <Route path="/admin/addresses">
                <PrivateAddress />
              </Route>
              <Route path="/admin/payments">
                <PrivatePayment />
              </Route>
              <Route path="/admin/deliveries">
                <PrivateDelivery />
              </Route>
              <Route path="/admin/admins">
                <PrivateAdmin />
              </Route>
            </PopupAddProvider>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </main>
      <Footer />
    </TogglerProvider>
  );
}

export default Admin;
