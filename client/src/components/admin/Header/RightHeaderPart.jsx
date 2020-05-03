import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Bar from "../../general/Bar";
import { AuthContext } from "../../../context/AuthContext";

function RightHeaderPart() {
  // Render the righside part of the header

  const { dataUser } = useContext(AuthContext);

  return (
    <div className="col-6 col-md-3 d-flex align-items-center justify-content-center">
      <Link className="text-decoration-none" to="/admin/my_profil">
        {dataUser.adminLevel === "superadmin" ? (
          <i className="ri-shield-user-line mx-1 mx-sm-2 icon-font22 color3c8ce4"></i>
        ) : (
          <i className="ri-shield-user-line mx-1 mx-sm-2 icon-font22 color3c8ce4"></i>
        )}
      </Link>
      <i className="ri-mail-fill mx-1 mx-sm-2 icon-font22 color3c8ce4"></i>
      <Link className="text-decoration-none" to="/adminlogout">
        <i className="ri-logout-circle-r-line mx-1 mx-sm-2 icon-font22 color3c8ce4"></i>
      </Link>
      <Bar />
    </div>
  );
}

export default RightHeaderPart;
