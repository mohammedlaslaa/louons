import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute({ linkAuth, component: Component, ...rest }) {
  // This route will render a component specify in props with the header and footer of the admin panel
  // get the auth context to ensure that the client is authenticated
  const { isLoading, isAuth, setCookieToken, setLinkAuth } = useContext(
    AuthContext
  );

  if (document.cookie === "") {
    setCookieToken("");
  }
  // get the page to redirect to if the client is not authenticated
  const { pageifnotauth } = { ...rest };
  useEffect(() => {
    // if the cookie is expired or inexisting, set the cookie token to an empty string, that will trigger automatically a logout
    setLinkAuth(linkAuth);
  }, [linkAuth, setLinkAuth]);

  if (isLoading) {
    return (
      <Route
        {...rest}
        render={() => {
          return (
            <p className="text-white message-loading text-center bg-success p-3 w-100">
              Loading ...
            </p>
          );
        }}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          return isAuth ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={pageifnotauth} />
          );
        }}
      />
    );
  }
}

PrivateRoute.defaultProps = {
  linkAuth: "http://localhost:5000/louons/api/v1/authenticationadmin",
};

export default PrivateRoute;
