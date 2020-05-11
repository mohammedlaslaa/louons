import React, { useState, useEffect } from "react";
import ListProduct from "./ListProduct";
import { useParams } from "react-router-dom";

function Category(props) {
  // initialize the state listArticle (get the id provided by the link)

  const [listArticle, setListarticle] = useState({
    id: props.location.id,
    isFetched: false,
    title: props.location.title,
    description: props.location.description,
    data: [],
    idLocationUndefined: true,
  });
  console.log(props.location.description);
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

    // if the listarticle.id is undefined and idLocationUndefined is settled to true get the id, the title and the description from the api

    if (!listArticle.id && listArticle.idLocationUndefined) {
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
          }
        });
    }

    // if isFetched is settled to false and there are a listarticle.id fetch the article from the api and set the isfetched value to true

    if (!listArticle.isFetched && listArticle.id) {
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

  return (
    <>
      <h2 className="col-12 mx-auto text-center">{listArticle.title}</h2>
      <p className="m-0 mx-auto col-12 text-center font-italic">
        {listArticle.description}
      </p>
      <ListProduct
        divClass="row col-12 col-lg-10 mx-auto m-0 p-0 d-flex"
        data={listArticle.data}
      />
    </>
  );
}

export default Category;
