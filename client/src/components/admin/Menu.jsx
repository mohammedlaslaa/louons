import React, { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [listMenu] = useState([
    { link: "", title: "Accueil" },
    { link: "users", title: "Utilisateurs" },
    { link: "category", title: "Catégories" },
    { link: "article", title: "Article" },
    { link: "rental", title: "Location" },
    { link: "adress", title: "Adresse" },
    { link: "payment", title: "Paiement" },
    { link: "delivery", title: "Livraison" },
    { link: "admins", title: "Administrateurs" },
    { link: "adminlogout", title: "Déconnexion" },
  ]);

  const listNav = listMenu.map((elt, index) => (
    <Link key={index} className="text-decoration-none" to={`/admin/${elt.link}`}>
      <li key={index} className="py-2 text-white border-bottom listmenuadmin">{elt.title}</li>
    </Link>
  ));

  return (
    <nav className="navadmin bg d-flex w-100">
      <ul className="list-unstyled w-100">{listNav}</ul>
    </nav>
  );
}

export default Menu;
