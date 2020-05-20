import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function TableProfil(props) {
  // Function that send a request to the api in order to delete a document
  const handleDelete = (id) => {
    fetch(`${props.linkapi}/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          props.setAddresses((prevState) => ({
            ...prevState,
            isFetched: false,
          }));
        }
      });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-announce">
        <thead>
          <tr>
            {Object.values(props.datatodisplay).map((elt, index) => (
              <th key={index}>{elt}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((e, ind) => (
            <tr key={ind}>
              {Object.keys(props.datatodisplay).map(
                (eltdatatodisplay, index) => {
                  if (e[eltdatatodisplay]) {
                    if (eltdatatodisplay === "date_register") {
                      return (
                        <td key={index}>
                          {moment(e[eltdatatodisplay]).format("DD/MM/YYYY")}
                        </td>
                      );
                    } else if (eltdatatodisplay === "price") {
                      return (
                        <td key={index}>{`${e[eltdatatodisplay]}€/jr`}</td>
                      );
                    } else if (eltdatatodisplay === "total_price") {
                      return <td key={index}>{`${e[eltdatatodisplay]}€`}</td>;
                    } else if (
                      eltdatatodisplay === "id_article" ||
                      eltdatatodisplay === "id_carrier" ||
                      eltdatatodisplay === "id_payment"
                    ) {
                      return <td key={index}>{e[eltdatatodisplay].title}</td>;
                    } else {
                      return <td key={index}>{e[eltdatatodisplay]}</td>;
                    }
                  } else {
                    if (eltdatatodisplay === "seemore") {
                      return (
                        <td key={index}>
                          <Link
                            to={`${props.linkdetail}/${e._id}`}
                            onClick={() =>
                              props.handleIdParams &&
                              props.handleIdParams(e._id)
                            }
                          >
                            <i className="ri-eye-line"></i>
                          </Link>
                        </td>
                      );
                    } else if (eltdatatodisplay === "delete") {
                      return (
                        <td key={index}>
                          <i
                            className="ri-delete-bin-6-fill"
                            onClick={() => handleDelete(e._id)}
                          ></i>
                        </td>
                      );
                    } else {
                      return true;
                    }
                  }
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableProfil;
