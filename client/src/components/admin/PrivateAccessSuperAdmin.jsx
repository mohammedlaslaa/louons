import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  // get the data of the User from the authcontext

  const { dataUser } = useContext(AuthContext);

  // if the admin is not a superadmin return a p with a not authorized message, otherwise send the component
  return (
    <Route
      {...rest}
      render={() => {
        return dataUser.adminLevel === "superadmin" ? (
          <Component {...rest} />
        ) : (
          <p className="bg-danger text-white p-2">Non Autorisé</p>
        );
      }}
    />
  );
}

export default PrivateRoute;
