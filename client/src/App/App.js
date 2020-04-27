import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/general.css";
import "../styles/icon/remixicon.css";
import Front from "../components/front/index.jsx";
import Admin from "../components/admin/index.jsx";
import Login from "../components/admin/Login";
import Logout from "../components/admin/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import PrivateRoute from "../components/general/PrivateRoute";

function App() {
  return (
    // Provide context authentication to the entire app and configure the main route admin and / (public)

    <Router>
      <AuthProvider>
        <Switch>
          <Route component={Login} exact path="/adminlogin"></Route>
          <Route component={Logout} exact path="/adminlogout"></Route>
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
