import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookieToken, setCookieToken] = useState(Cookies.get("x-auth-token"));
  const [dataUser, setDataUser] = useState({});
  const [linkAuth, setLinkAuth] = useState("");

  // if the cookie token is existing fetch to the api to ensure that the client has a valid cookie token else set the isAuth value to false.

  useEffect(() => {

    if (cookieToken && linkAuth) {
      fetch(linkAuth, {
        credentials: "include", // ensure that the header can include cookie.
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setIsAuth(true);
            setDataUser(result.user);
          } else if (result.error) {
            setIsAuth(false);
            setCookieToken("");
          }
          setIsLoading(false);
        });
    } else if (!cookieToken) {
      setIsAuth(false);
      setIsLoading(false);
    }

  }, [cookieToken, linkAuth]);

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
        dataUser,
        setLinkAuth,
        linkAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
