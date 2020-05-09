import React from "react";

function ListProduct(props) {
  return (
    <div className="row col-12 col-lg-10 mx-auto m-0 p-0 d-flex justify-content-center justify-content-lg-between">
      {props.data.map((elt, index) => {
        return (
          <div
            key={index}
            className="col-8 col-sm-6 col-lg-3 p-2 my-2 my-lg-4 product-container d-flex flex-column justify-content-end"
          >
            <img
              src={`http://localhost:5000/uploads/img/${elt.pictures[0].path_picture}`}
              alt=""
              className="w-100 img-fluid thumbnail-img mx-auto"
            />

            <div className="d-flex flex-column flex-xl-row p-1 justify-content-center align-items-center text-center">
              <p className="p-1 text-center titleannounce mx-md-3">
                {elt.title.length > 12 ? `${elt.title.slice(0, 12)}...` : elt.title}
              </p>
              <p className="mb-1 m-sm-0 font-weight-bold">{elt.price} €/jr</p>
            </div>
            <button className="btn btn-outline-dark p-1 listproduct-btn">
              Voir l'article
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ListProduct;
