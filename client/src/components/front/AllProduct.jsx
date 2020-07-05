import React, { useState, useEffect } from "react";
import ListProduct from "./ListProduct";
import Api from '../../Classes/Api/Api';

function AllProduct() {
  // initialize the state listArticle
  const ApiLink = Api.endPoint;
  const [listArticle, setListarticle] = useState({
    isFetched: false,
    title: "Toutes les annonces",
    description: "Retrouvez ici toutes les annonces",
    data: [],
  });

  useEffect(() => {
    // if isFetched is settled to false and there are a listarticle.id fetch the article from the api and set the isfetched value to true

    if (!listArticle.isFetched) {
      fetch(
        `${ApiLink}/article`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setListarticle((prevState) => ({
              ...prevState,
              data: result.data,
              isFetched: true,
            }));
          }
        });
    }
  }, [listArticle, ApiLink]);

  return (
    <>
      <h2 className="col-12 m-auto text-center category-title">
        {listArticle.title}
      </h2>
      <p className="col-12 col-lg-10 m-0 m-auto mt-md-3 p-2 text-center text-white font-italic bgcolor3c8ce4">
        {listArticle.description}
      </p>
      <ListProduct
        divClass="row col-12 col-lg-10 mx-auto m-0 p-0 d-md-flex flex-column justify-content-center justify-content-md-start"
        productClass="col-6 col-sm-4 col-lg-3 p-2 my-2 my-lg-4 product-container d-flex flex-column justify-content-end"
        data={listArticle.data}
      />
    </>
  );
}

export default AllProduct;
