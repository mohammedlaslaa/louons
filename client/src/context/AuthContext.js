import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookieToken, setCookieToken] = useState(Cookies.get("x-auth-token"));

  // if the cookie token is existing fetch to the api to ensure that the client has a valid cookie token else set the isAuth value to false.

  useEffect(() => {
    if (cookieToken) {
      fetch("http://localhost:5000/louons/api/v1/authentificationadmin", {
        credentials: "include", // ensure that the header can include cookie.
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.error) {
            setIsAuth(true);
          } else if (json.error) {
            setIsAuth(false);
          }
        });
      setIsLoading(false);
    } else {
      setIsAuth(false);
      setIsLoading(false);
    }
  }, [cookieToken]);

  // return the authcontext provider component

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        cookieToken,
        isLoading,
        setIsLoading,
        setCookieToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
