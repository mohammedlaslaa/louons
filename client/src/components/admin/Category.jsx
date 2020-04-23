import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <>
      <h1>Hello from Category !</h1>
      <Link to="/admin/home">Home</Link>
      <Link to="/admin/logout">Logout</Link>
    </>
  );
}

export default Category;
