import React from "react";
import Header from "../Header";
import { ListCategoryProvider } from "../../context/SubCategoryContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/icon/remixicon.css";
import "../../styles/general.css";

function App() {
  return (
    <ListCategoryProvider>
      <Header />
    </ListCategoryProvider>
  );
}

export default App;
