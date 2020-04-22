import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Home from "./components/Home";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuth, setCookieToken } = useContext(AuthContext);
  const { pageifnotauth } = { ...rest };

  if(document.cookie == ""){
    setCookieToken('')
  }
  return (
    <>
    <h1>exemple footer</h1>
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={pageifnotauth} />
        );
      }}
    />
    <h1>exemple footer</h1>
    </>
  );
}

export default PrivateRoute;
