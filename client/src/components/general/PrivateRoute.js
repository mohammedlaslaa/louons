import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  // This route will render a component specify in props with the header and footer of the admin panel

  // get the auth context to ensure that the client is authenticated
  const { isLoading, isAuth, setCookieToken } = useContext(AuthContext);

  // get the page to redirect to if the client is not authenticated
  const { pageifnotauth } = { ...rest };

  // if the cookie is expired or inexisting, set the cookie token to an empty string, that will trigger automatically a logout
  if (document.cookie === "") {
    setCookieToken("");
  }
  
  if(isLoading){
    return (
      <Route
        {...rest}
        render={() => {
          return <p className="text-white text-center bg-success p-3">Loading ...</p>;
        }}
      />
    );
  }

  return (
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
  );
}

export default PrivateRoute;
