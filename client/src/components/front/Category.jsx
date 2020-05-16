import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListProduct from "./ListProduct";
import NotFound from "../general/NotFound";

function Category(props) {
  // initialize the state listArticle (get the id provided by the link)

  const [listArticle, setListarticle] = useState({
    id: props.location.id,
    isFetched: false,
    title: props.location.title,
    description: props.location.description,
    data: [],
    idLocationUndefined: true,
    isNotFound: false,
  });

  // get the title of the category

  const linkCat = useParams().title;

  useEffect(() => {
    // if the location.id is not equal to the current article and location.id is not undefined change the id the title and the description, finally set the isfetched to false in order to fetch the data to the api

    if (props.location.id !== listArticle.id && props.location.id) {
      setListarticle((prevState) => ({
        ...prevState,
        id: props.location.id,
        title: props.location.title,
        description: props.location.description,
        isFetched: false,
      }));
    }

    // if the listarticle.id is undefined, and if idLocationUndefined is settled to true, and the isnotfound is settled to false, get the id, the title and the description from the api

    if (
      !listArticle.id &&
      listArticle.idLocationUndefined &&
      !listArticle.isNotFound
    ) {
      fetch(
        `http://localhost:5000/louons/api/v1/category/detail?title=${linkCat}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setListarticle((prevState) => ({
              ...prevState,
              id: result.data[0]._id,
              title: result.data[0].title,
              description: result.data[0].description,
              idLocationUndefined: false,
            }));
          } else {
            setListarticle((prevState) => ({
              ...prevState,
              isNotFound: true,
            }));
          }
        });
    }

    // if isFetched is settled to false and there are a listarticle.id, and the isnotfound is settled to false, fetch the article from the api and set the isfetched value to true

    if (!listArticle.isFetched && listArticle.id && !listArticle.isNotFound) {
      fetch(
        `http://localhost:5000/louons/api/v1/article/searcharticle/${listArticle.id}`,
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
  }, [listArticle, props.location, linkCat]);

  return listArticle.isNotFound ? (
    <NotFound />
  ) : (
    <>
      <h2 className="col-12 m-auto text-center category-title">
        {listArticle.title}
      </h2>
      <p className="col-12 col-lg-10 m-0 m-auto mt-md-3 p-2 text-center text-white font-italic bgcolor3c8ce4">
        {listArticle.description}
      </p>
      <ListProduct
        divClass="col-12 col-lg-10 mx-auto m-0 p-0 d-flex justify-content-center justify-content-md-start"
        productClass="col-6 col-sm-4 col-lg-3 p-2 my-2 my-lg-4 product-container d-flex flex-column justify-content-end"
        data={listArticle.data}
      />
    </>
  );
}

export default Category;
