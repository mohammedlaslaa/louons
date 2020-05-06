import React, { useState, useEffect } from "react";

function Home() {
  const [article, setArticle] = useState({
    data: [],
  });
  useEffect(() => {
    fetch("http://localhost:5000/louons/api/v1/article/activetop", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setArticle((prevState) => ({ ...prevState, data: result.data }));
        }
      });
  }, []);
  console.log(article);
  return (
    <>
      <h1 className="mx-auto color3c8ce4 p-2">Bienvenue sur louons.fr</h1>
      <div className="row m-0 p-0">
        <div className="row col-12 col-lg-6 m-0 p-0 order-lg-last d-flex justify-content-around">
          {article.data.map((elt, index) => {
            return (
              <img
                key={index}
                src={`http://localhost:5000/uploads/img/${elt.pictures[0].path_picture}`}
                alt=""
                className="w-100 col-5 p-2 my-2 my-lg-4"
              />
            );
          })}
        </div>
        <div className="row col-12 col-lg-6 m-0 p-0 order-lg-first"></div>
      </div>
    </>
  );
}

export default Home;
