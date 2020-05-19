import React from "react";

function TableRental(props) {
  return (
    <div className="table-responsive mt-5">
      <table className="text-center table-rental w-100 border border-black">
        <thead>
          <tr>
            <th></th>
            <th className="p-3">Nom</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((e, index) => (
            <tr key={index} className="border border-black">
              <td>
                <div className="d-flex align-items-center h-100">
                  <input
                    type="radio"
                    name="delivery"
                    className="mx-auto"
                    value={e._id}
                    checked={e._id === props.isChecked}
                    onChange={(e) => {
                      const { value } = e.target;
                      props.setRental((prevState) => ({
                        ...prevState,
                        [props.propertyvalue]: value,
                      }));
                    }}
                  />
                </div>
              </td>
              <td>
                {e.title}
                <img
                  className="img-fluid thumbnail-delivery-payment"
                  src={`http://localhost:5000/uploads/img/${e.path_picture}`}
                  alt="picture_delivery"
                />
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center h-100">
                  <p className="text-center">{e.description}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableRental;
