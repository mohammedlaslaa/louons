import React, { useState, useContext } from "react";
import "../../../styles/front/footer.css";
import { ListCategoryContext } from "../../../context/ListCategoryContext";
import PartOfFooter from "./PartOfFooter";

function Footer() {
  // define the list to display for each part of the footer

  const [partAccount] = useState([
    { link: "my_account", title: "Infos personnelles" },
    { link: "my_account/rentals", title: "Locations" },
    { link: "my_account/announces", title: "Mes annonces" },
    { link: "message", title: "Message" },
    { link: "login", title: "Connexion" }
  ]);

  const [partSociety] = useState([
    { link: "aboutus", title: "Qui sommes nous ?" },
    { link: "legalmention", title: "Mentions Légales" },
    { link: "cgv", title: "CGV" },
    { link: "contactus", title: "Nous contacter" }
  ]);

  // get the context of listCat

  const {listCat} = useContext(ListCategoryContext);

  return (
    // Return all components of the footer
    <footer className="bgcolor144c84 d-flex flex-column flex-md-row w-100">
        <PartOfFooter dataToDisplay={partAccount} pathlink="" title="Mon compte" />
        <PartOfFooter dataToDisplay={listCat} pathlink="/categories" title="Catégories" />
        <PartOfFooter dataToDisplay={partSociety} pathlink="" title="Informations" />
    </footer>
  );
}
export default Footer;
