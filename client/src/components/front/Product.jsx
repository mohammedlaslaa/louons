import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../general/NotFound";
import LiForm from "../general/Form/LiForm";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

function Product() {
  // get the id params of the link
  const id = useParams().id;

  // get the context from the authcontext
  const { isAuth } = useContext(AuthContext);

  // initialize the state of the article
  const [article, setArticle] = useState({
    mainpicture: "",
    data: {},
    isFetched: false,
    error: false,
    isShownButton: true,
    prevNumberDay: 0,
    numberDay: 1,
    listDate: [],
    currDateLi: "",
    dateStart: "",
    dateEnd: "",
  });

  useEffect(() => {
    // fetch the data of the article only if the isfetched is settled to false. If there are not error, set the data in the article state, otherwise set the error in the article state to true
    if (!article.isFetched) {
      fetch(`http://localhost:5000/louons/api/v1/article/detail/${id}`)
        .then((res) => res.json())
        .then((result) => {
          if (!result.error && result.data.isActive) {
            setArticle((prevState) => ({
              ...prevState,
              data: result.data,
              isFetched: true,
              mainpicture: result.data.pictures[0].path_picture,
            }));
          } else {
            setArticle((prevState) => ({
              ...prevState,
              error: true,
              isFetched: true,
            }));
          }
        });
    }
  }, [id, article]);

  const handleFetchDate = () => {
    // Fetch the date only if numberday and the prevnumberday are not equal
    if (article.numberDay !== article.prevNumberDay && article.numberDay > 0) {
      fetch(
        `http://localhost:5000/louons/api/v1/rental/date/${id}/${article.numberDay}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            setArticle((prevState) => ({
              ...prevState,
              currDateLi: "",
              listDate: result.data,
            }));
          }
        });
    }
  };

  return article.error ? (
    // if there are an error (wrong params id for example) send the not found page
    <NotFound />
  ) : (
    <div className="col-12 col-sm-11 col-lg-10 col-xl-9 mx-auto product-detail-container">
      <div className="row">
        <div className="col-12 col-md-7 col-lg-8 picture-container">
          {article.isFetched && (
            <div className="row">
              <div className="col-12 col-md-2 order-1 order-md-0 my-3">
                <div className="row h-100 d-flex align-items-center justify-content-around">
                  {article.data.pictures.map((elt, index) => {
                    return (
                      <div
                        key={index}
                        className="p-0 col-2 col-md-8 thumbnail-img-product"
                      >
                        <img
                          className="img-fluid w-100"
                          src={`http://localhost:5000/uploads/img/${elt.path_picture}`}
                          alt=""
                          onClick={() =>
                            setArticle((prevState) => ({
                              ...prevState,
                              mainpicture: elt.path_picture,
                            }))
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-12 col-md-10 main-picture-container d-flex align-items-center">
                <img
                  className="img-fluid main-picture mx-auto"
                  src={`http://localhost:5000/uploads/img/${article.mainpicture}`}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="col-12 col-md-5 col-lg-4 text-center d-flex flex-column justify-content-center">
          <h3 className="mt-3">{article.data.title}</h3>
          <div>
            <p className="mt-2 mt-md-3 font-weight-bold">Description :</p>
            <p className="my-3">{article.data.description}</p>
            <p className="my-3 font-weight-bold">Prix de location :</p>
            <p className="my-3">{article.data.price} €/jr</p>
            {!isAuth ? (
              <p>Veuillez vous connecter pour voir les disponibilités</p>
            ) : article.isShownButton ? (
              <button
                className="btn btn-outline-dark my-3"
                onClick={() =>
                  setArticle((prevState) => ({
                    ...prevState,
                    isShownButton: false,
                  }))
                }
              >
                Disponibilités
              </button>
            ) : (
              <>
                <p>Nbr de jour :</p>
                <div className="d-flex justify-content-center align-items-center">
                  <i
                    className="ri-indeterminate-circle-line ri-2x"
                    onClick={() =>
                      setArticle((prevState) => ({
                        ...prevState,
                        prevNumberDay: prevState.numberDay,
                        numberDay: prevState.numberDay - 1,
                      }))
                    }
                  ></i>
                  <p className="number-day mx-2 my-0">{article.numberDay}</p>
                  <i
                    className="ri-add-circle-line ri-2x"
                    onClick={() =>
                      setArticle((prevState) => ({
                        ...prevState,
                        prevNumberDay: prevState.numberDay,
                        numberDay: prevState.numberDay + 1,
                      }))
                    }
                  ></i>
                  <button
                    className="btn btn-outline-primary ml-3"
                    onClick={() => {
                      setArticle((prevState) => ({
                        ...prevState,
                        prevNumberDay: prevState.numberDay,
                      }));
                      handleFetchDate();
                    }}
                  >
                    Ok
                  </button>
                  {article.listDate.length > 0 && (
                    <button
                      className="btn btn-outline-danger mx-1"
                      onClick={() =>
                        setArticle((prevState) => ({
                          ...prevState,
                          listDate: [],
                          currDateLi: "",
                          dateStart: "",
                          dateEnd: "",
                          prevNumberDay: 0,
                          numberDay: 1,
                        }))
                      }
                    >
                      Reset
                    </button>
                  )}
                </div>
                {article.listDate.length > 0 && (
                  <ul className="list-unstyled my-3">
                    {article.listDate.map((elt, index) => {
                      return (
                        <LiForm
                          key={index}
                          index={index}
                          className={
                            article.currDateLi === index
                              ? "p-1 list-date bg-secondary text-white"
                              : "p-1 list-date"
                          }
                          setCurrLi={() =>
                            setArticle((prevState) => ({
                              ...prevState,
                              currDateLi: index,
                            }))
                          }
                          dateStart={elt.dateStart}
                          dateEnd={elt.dateEnd}
                          setDateStart={() =>
                            setArticle((prevState) => ({
                              ...prevState,
                              dateStart: moment(elt.dateStart).format(
                                "YYYY-MM-DD"
                              ),
                            }))
                          }
                          setDateEnd={() =>
                            setArticle((prevState) => ({
                              ...prevState,
                              dateEnd: moment(elt.dateEnd).format("YYYY-MM-DD"),
                            }))
                          }
                        />
                      );
                    })}
                  </ul>
                )}
                {article.dateStart && (
                  <Link to="/order">
                    <button
                      className="btn btn-outline-primary m-3"
                      onClick={() => 
                        Cookies.set("article", {
                          article: article.data,
                          dateStart: article.dateStart,
                          dateEnd: article.dateEnd,
                          numberDay: article.numberDay,
                        })
                      }
                    >
                      Réserver à cette date
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
