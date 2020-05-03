import React, { useContext } from "react";
import AdminFormLogic from "./Admins/AdminFormLogic";
import { AuthContext } from "../../context/AuthContext";

function MyProfil() {
  const { dataUser } = useContext(AuthContext);

  return <AdminFormLogic id={dataUser._id} title="Mon profil"/>;
}

export default MyProfil;
