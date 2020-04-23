import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <>
      <h1>Hello from Category !</h1>
      <Link to="/admin">Home</Link>
      <Link to="/adminlogout">Logout</Link>
    </>
  );
}

export default Category;
