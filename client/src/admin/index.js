import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Category from "./components/Category";
import PrivateRoute from "./PrivateRoute";

function Admin() {
  // allow access to the signin page. If the user is authenticated, the privateroute component will be set a cookie in contextprivateroute and verify this on each refresh page

  return (
    <Switch>
      <Route path="/admin/home">
        <PrivateRoute component={Home} pageifnotauth="/admin/login" />
      </Route>
      <Route path="/admin/category">
        <PrivateRoute component={Category} pageifnotauth="/admin/login" />
      </Route>
      <Route exact path="/admin/login" component={Login}></Route>
      <Route exact path="/admin/logout" component={Logout}></Route>
    </Switch>
  );
}

export default Admin;
