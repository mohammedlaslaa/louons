import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  // When this component is called, it will set the isAuth to false, the cookie will also bee removed and the client will be redirected to the login page

  const { setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsAuth(false);
    Cookies.remove("x-auth-token");
  });

  return <Redirect to="/adminlogin" />;
}

export default Logout;
