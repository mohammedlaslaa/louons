import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const { setIsAuth } = useContext(AuthContext);

  setIsAuth(false);
  Cookies.remove('x-auth-token')

  return <Redirect to="/admin/login" />;
}

export default Logout;
