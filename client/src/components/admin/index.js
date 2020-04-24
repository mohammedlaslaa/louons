import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Category from "./Category";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer.jsx";
import Logout from "./Logout";
import PrivateRoute from "../general/PrivateRoute";
import "../../styles/admin/global.css";
import { ToggleMenuProvider } from "../../context/TogglerMenuContext";

function Admin() {
  // This routes are only accessible when the user is logged in (PrivateRoute)

  return (
    <Switch>
      <Route path="/admin">
        <ToggleMenuProvider>
          <Header />
          <main className="row">
            <Menu />
            <div className="col-12 col-lg-9">
              <Route exact path="/admin">
                <PrivateRoute component={Home} pageifnotauth="/adminlogin" />
              </Route>
              {/* <Route path="/admin/panel/users"></Route> */}
              <Route path="/admin/category">
                <PrivateRoute
                  component={Category}
                  pageifnotauth="/adminlogin"
                />
              </Route>
              {/* <Route path="/admin/panel/article"></Route>
            <Route path="/admin/panel/rental"></Route>
            <Route path="/admin/panel/adress"></Route>
            <Route path="/admin/panel/payment"></Route>
            <Route path="/admin/panel/delivery"></Route>
            <Route path="/admin/panel/admins"></Route> */}
              <Route component={Logout} path="/adminlogout"></Route>
            </div>
          </main>
        </ToggleMenuProvider>
        <Footer />
      </Route>
    </Switch>
  );
}

export default Admin;
