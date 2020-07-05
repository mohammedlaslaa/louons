import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function Logout(props) {
  // When this component is called, it will set the isAuth to false, the cookie will also bee removed and the client will be redirected to the login page

  const { setIsAuth, setCookieToken } = useContext(AuthContext);

  useEffect(() => {
    Cookies.remove("x-auth-token");
    setCookieToken("");
    setIsAuth(false);
  });

  return <Redirect to={props.redirect} />;
}

export default Logout;
