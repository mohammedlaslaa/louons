import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TogglerContext } from "../../context/TogglerContext";
import { CSSTransition } from "react-transition-group";

function Menu() {

  // Initialize the list of the menu

  const [listMenu] = useState([
    { link: "", title: "Accueil" },
    { link: "users", title: "Utilisateurs" },
    { link: "categories", title: "Catégories" },
    { link: "articles", title: "Article" },
    { link: "rentals", title: "Location" },
    { link: "addresses", title: "Adresse" },
    { link: "payments", title: "Paiement" },
    { link: "deliveries", title: "Livraison" },
    { link: "admins", title: "Administrateurs" },
    { link: "adminlogout", title: "Deconnexion" },
  ]);

  // Get the context of the toggler in order to display the menu or no

  const { isToggle, setToggle } = useContext(TogglerContext);

  const isShown = isToggle && "d-flex";

  // Map over the listMenu in order to display them

  const listNav = listMenu.map((elt, index) => (
    <Link
      key={index}
      className="text-decoration-none"
      to={elt.title === 'Deconnexion' ? `/${elt.link}` : `/admin/${elt.link}`}
    >
      <li key={index} className="py-2 text-white text-center border-bottom listmenuadmin" onClick={()=> setToggle(false)}>
        {elt.title}
      </li>
    </Link>
  ));

  return (
    <CSSTransition
      classNames="menuadmin"
      timeout={600}
      in={isToggle}
    >
      <div
        className={`${isShown} menuadmincontainer d-lg-flex col-6 col-md-4 col-lg-2 bgcolor9cd1ff`}
      >
        <nav className="navadmin bg d-flex w-100">
          <ul className="list-unstyled w-100 d-flex flex-column justify-content-center justify-content-lg-start">{listNav}</ul>
        </nav>
      </div>
    </CSSTransition>
  );
}

export default Menu;
