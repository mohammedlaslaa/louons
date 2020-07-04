import React, { useState, useEffect } from "react";
import ListProduct from "../ListProduct";
import "../../../styles/front/home.css";
import Api from "../../../Classes/Api/Api";

function Home() {
  const ApiLink = Api.endPoint;
  const [article, setArticle] = useState({
    data: [],
  });

  const [text] = useState([
    {
      message: "Publiez vos articles et recevez des offres de locations",
    },
    {
      message: "Louez auprès de personnes évalués",
    },
    {
      message: "Donnez une seconde vie à vos articles et pensez écolo",
    },
  ]);

  useEffect(() => {
    fetch(`${ApiLink}/article/lastactive`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setArticle((prevState) => ({ ...prevState, data: result.data }));
        }
      });
  }, [ApiLink]);

  return (
    <>
      <h1 className="color144c84 p-2 my-3 col-12 text-center">
        Bienvenue sur louons.fr
      </h1>
      <div className="row col-12 mx-0 my-2 my-md-5 p-0 d-flex mx-auto">
        {text.map((e, index) => (
          <div
            key={index}
            className="col-11 col-sm-8 col-md-5 col-lg-3 border border-white mx-auto hometext bgcolor9cd1ff text-white p-1 my-2 text-center"
          >
            {index === 0 ? (
              <i className="ri-edit-line ri-3x"></i>
            ) : index === 1 ? (
              <i className="ri-service-line ri-3x"></i>
            ) : (
                  <i className="ri-time-line ri-3x"></i>
                )}
            <p className="text-center m-0 mx-auto">{e.message}</p>
          </div>
        ))}
      </div>
      <h2 className="bgcolor144c84 p-2 my-3 col-12 col-lg-10 mx-auto text-center text-white font-italic">
        Derniers articles publiés
      </h2>
      <ListProduct data={article.data} />
    </>
  );
}

export default Home;
