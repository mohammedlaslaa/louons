import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/general.css";
import "../styles/icon/remixicon.css";
import Front from "../components/front/index.jsx";
import Admin from "../components/admin/index.jsx";
import Login from "../components/general/Login";
import Logout from "../components/general/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import PrivateRoute from "../components/general/PrivateRoute";
import Api from '../Classes/Api/Api.js';

function App() {
  const ApiLink = Api.endPoint;
  return (
    // Provide context authentication to the entire app and configure the main route admin and / (public)

    <Router>
      <AuthProvider>
        <Switch>
          <Route
            exact
            path="/adminlogin"
            render={(props) => (
              <Login
                linkapi={`${ApiLink}/authenticationadmin`}
                redirect="/admin"
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/adminlogout"
            render={(props) => <Logout {...props} redirect="/adminlogin" />}
          />
          <Route path="/admin">
            <PrivateRoute component={Admin} pageifnotauth="/adminlogin" />
          </Route>
          <Route path="/">
            <Front />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
