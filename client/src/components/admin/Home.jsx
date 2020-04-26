import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  // get the data of the current admin in order to deal with them and render the content of the home page
  const { dataUser } = useContext(AuthContext);

  return (
    <>
      <h3 className="titlepage">
        Bienvenue sur le panel de louons.fr{" "}
        {`${dataUser.firstName} ${dataUser.lastName}`}
      </h3>
      <div>
        <img
          src="/assets/img/welcome.jpg"
          className="w-100"
          alt="welcome_panel"
        />
      </div>
    </>
  );
}

export default Home;
