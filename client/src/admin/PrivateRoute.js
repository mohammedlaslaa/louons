import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const {isAuth, cookieToken} = useContext(AuthContext);
  const {pageifnotauth}= {...rest};
console.log('privatecookie', cookieToken)
  return (
    <Route
      {...rest}
      render={(props) =>{
        return isAuth ? <Component {...props} /> : <Redirect to={pageifnotauth} />}
      }
    />
  );
}

export default PrivateRoute;
