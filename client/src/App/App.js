import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/general.css";
import "../styles/icon/remixicon.css";
import Front from "../front";
import Admin from "../admin";
import { Switch, Route } from "react-router-dom";
import AuthProvider  from "../context/AuthContext";

function App() {
  return (
    // Provide the category list to the app or to the component that need it
    <AuthProvider>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Front />
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
