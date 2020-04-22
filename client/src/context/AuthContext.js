import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const token = Cookies.get("x-auth-token")
  const [cookieToken, setCookieToken] = useState(token);

  useEffect(()=>{
    setCookieToken(token)
  }, [token])
  
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, cookieToken, setCookieToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
