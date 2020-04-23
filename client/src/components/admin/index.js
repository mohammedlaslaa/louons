import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import Category from "./Category";
import PrivateRoute from "./PrivateRoute";

function Admin() {
  // allow access to the signin page and manage the redirection. If the user is authenticated, the authcontext wil set the isAuth to true and send the resqueted route, otherwise, the client will be automatically redirected to the login page. The cookieToken will be verified on each refresh page or set him to '' when its expire

  return (
    // {here make two components private and public}
    <Switch>
      <Route exact path="/admin">
        <Redirect to="/admin/login" />
      </Route>
      <Route path="/admin/home">
        <PrivateRoute component={Home} pageifnotauth="/admin/login" />
      </Route>
      <Route path="/admin/category">
        <PrivateRoute component={Category} pageifnotauth="/admin/login" />
      </Route>
      <Route component={Login} exact path="/admin/login"></Route>
      <Route component={Logout} exact path="/admin/logout"></Route>
    </Switch>
  );
}

export default Admin;
