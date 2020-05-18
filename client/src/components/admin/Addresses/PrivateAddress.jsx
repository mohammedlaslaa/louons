import React from "react";
import { Switch, Route } from "react-router-dom";
import ListAddress from "./ListAddress";
import NotFound from "../../general/NotFound";
import AddressFormLogic from "../../general/Form/AddressFormLogic.js";

function PrivateAddress() {
  return (
    <Switch>
      <Route exact path="/admin/addresses">
        <ListAddress />
      </Route>
      <Route exact path="/admin/addresses/add"  render={(props) => <AddressFormLogic {...props} title="Ajouter" />}/>
      <Route
        exact
        path="/admin/addresses/:id"
        render={(props) => <AddressFormLogic {...props} title="Modifier" />}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default PrivateAddress;
