import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/general.css";
import "../styles/icon/remixicon.css";
import Front from "../components/front";
import Admin from "../components/admin";
import Login from "../components/admin/Login";
import Logout from "../components/admin/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../context/AuthContext";

function App() {
  return (
    // Provide context authentication to the entire app and configure the main route admin and / (public)
    <AuthProvider>
      <Router>
        <Switch>
          <Route component={Login} path="/adminlogin"></Route>
          <Route component={Logout} exact path="/adminlogout"></Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Front />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
