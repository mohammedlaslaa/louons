import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import "../../styles/admin/login.css";

function Login({ history }) {
  // initialize state and set them when the input email and password change

  const { isAuth, setIsAuth, setIsLoading, setCookieToken } = useContext(
    AuthContext
  );
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

 

  useEffect(() => {
    if (isAuth) {
      history.replace("/admin/home");
    }
  }, [isAuth]);

  // when the form is submitted, fetch them to the api in order to login the user

  const onFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/louons/api/v1/authentificationadmin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          setIsAuth(true);
          setIsLoading(false);
          setCookieToken(Cookies.get("x-auth-token"));
          history.replace("/admin/home");
        }
      });
  };

  return (
    <>
      <header className="row d-flex align-items-center">
        <div className="col-12 col-md-6 text-center p-3 order-md-1">
          <img
            src="../assets/img/louons.png"
            alt="logo_louons"
            className="img-fluid logoimg"
          />
        </div>
        <div className="col-12 col-md-6 text-center p-3">
          <h1 className="titlelogin color3c8ce4">Connexion au Panel Admin</h1>
        </div>
      </header>
      <main className="row flex-grow-1">
        <form
          className="mt-5 form-group mx-auto d-flex flex-column col-12 col-sm-8 col-md-5 align-items-center"
          onSubmit={onFormSubmit}
        >
          <label className="p-2 w-100">
            Email :
            <input
              className="form-control mt-3"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="p-2 w-100">
            Mot de passe :
            <input
              className="form-control mt-3"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input
            className="bgcolor3c8ce4 text-white btn btnlogin"
            type="submit"
            value="Connexion"
          />
        </form>
      </main>
    </>
  );
}

export default Login;