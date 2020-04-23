import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Hello from Panel !</h1>
      <Link to="/admin/panel/category">go to cat</Link>
    </>
  );
}

export default Home;
