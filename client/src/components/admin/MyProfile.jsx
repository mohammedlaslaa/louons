import React, { useContext } from "react";
import AdminFormLogic from "./Admins/AdminFormLogic";
import { AuthContext } from "../../context/AuthContext";

function MyProfile(props) {
  const { dataUser } = useContext(AuthContext);

  return <AdminFormLogic {...props} id={dataUser._id} title="Mon profil"/>;
}

export default MyProfile;
