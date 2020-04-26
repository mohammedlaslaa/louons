import React, { Component } from "react";
import { Link } from "react-router-dom";
import SwictButton from "../general/SwitchButton";

class PageTableList extends Component {
  // Component that render a list table with the props he receives
  // isLoading = message displayed when the user change the current page
  // isLoadingUpdate = message displayed when the user try to update
  // isUnAuthorized = message displayed when the user is not authorized to access to this route
  // listOfTh = object of data received in props. This data corresponds to what we want to display in the table header.
  // listOfData = empty array which will be replaced by the data received by the fetch API (the link is also provided in props)

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingUpdate: false,
      isUnAuthorized: false,
      listOfTh: props.th,
      listOfData: [],
    };
  }

  // When the component is mount, the isloading state is set to true and fetch the data to the api (link provided in props)
  // if there are not error, set the listOfData, else if there are error and the message is "Not authorized..." set the isUnauthorized to true.
  // then set the isloading to false

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    fetch(this.props.linkapi, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          this.setState({
            listOfData: result,
          });
        } else if (
          (result.error && result.message === "Not authorized admin level") ||
          result.message === "Not Authorized"
        ) {
          this.setState({
            isUnAuthorized: true,
          });
        }
        this.setState({
          isLoading: false,
        });
      });
  }

  // This method allow to update the isactive field, depending on the API link and the id and boolean passed in parameter
  // When this method is called, the isLoadingUpdate state is set to true and when the fetch operation is finished, this state is set to false

  handleIsActive = (id, bool) => {
    this.setState({
      isLoadingUpdate: true,
    });
    fetch(`${this.props.linkapi}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: !bool }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          this.setState({
            isLoadingUpdate: false,
          });
        }
      });
  };

  // Convert the iso date provided by the api to the date format dd/mm/yyyy

  getDateRegister = (arg) => {
    let date = new Date(arg);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  // Render the display of the table depending the states. Mapping over the listOfTh and the listOfData object keys in array and compare them in order to display the table correctly

  render() {
    const {
      listOfData,
      listOfTh,
      isLoading,
      isLoadingUpdate,
      isUnAuthorized,
    } = this.state;

    return isLoading ? (
      <p className="bg-success text-white p-2">Loading....</p>
    ) : isUnAuthorized ? (
      <p className="bg-danger text-white p-2">Non Autorisé</p>
    ) : (
      <>
        <h4 className="titlepage">{this.props.titlepage}</h4>
        {isLoadingUpdate && (
          <p className="bg-success text-white p-2">Loading....</p>
        )}
        <div className="text-right p-3">
          {this.props.titlebutton && (
            <Link to={this.props.linkbutton}>
              <button className="btn text-white bgcolor3c8ce4">
                {this.props.titlebutton}
              </button>
            </Link>
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {listOfTh.map((elt, index) => (
                  <th className="text-center" key={index}>
                    {Object.values(elt)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listOfData.map((eltData, indexData) => {
                return (
                  <tr key={indexData}>
                    {listOfTh.map((eltTh) => {
                      return Object.keys(eltTh).map((subTh) =>
                        subTh === "seeMore" ? (
                          <td
                            className="text-center"
                            key={`seemore${indexData}`}
                          >
                            Voir
                          </td>
                        ) : subTh === "category" ? (
                          <td
                            className="text-center"
                            key={`category${indexData}`}
                          >
                            {eltData["id_category"].title}
                          </td>
                        ) : subTh === "price" ? (
                          <td className="text-center" key={`price${indexData}`}>
                            {`${eltData.price} €`}
                          </td>
                        ) : subTh === "article" ? (
                          <td
                            className="text-center"
                            key={`article${indexData}`}
                          >
                            {eltData.id_article["title"]}
                          </td>
                        ) : subTh === "user" ? (
                          <td className="text-center" key={`user${indexData}`}>
                            {`${eltData.id_user["lastName"]} ${eltData.id_user["firstName"]}`}
                          </td>
                        ) : subTh === "address" ? (
                          <td className="text-center" key={`user${indexData}`}>
                            {`${eltData.address} ${eltData.zipcode} ${eltData.city}`}
                          </td>
                        ) : (
                          Object.keys(eltData).map((subData) =>
                            subTh === subData ? (
                              <td key={indexData} className="text-center">
                                {subTh === "isSubscribe" ? (
                                  eltData[subData] ? (
                                    "Oui"
                                  ) : (
                                    "Non"
                                  )
                                ) : subTh === "isActive" ? (
                                  <SwictButton
                                    isActive={eltData["isActive"]}
                                    id={eltData["_id"]}
                                    handleIsActive={this.handleIsActive}
                                  />
                                ) : subTh === "date_register" ||
                                  subTh === "start_date" ||
                                  subTh === "end_date" ? (
                                  this.getDateRegister(eltData[subData])
                                ) : (
                                  eltData[subData]
                                )}
                              </td>
                            ) : (
                              true
                            )
                          )
                        )
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default PageTableList;
