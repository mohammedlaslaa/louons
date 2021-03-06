import React, { Component } from "react";
import { Link } from "react-router-dom";
import SwitchButton from "../general/SwitchButton";
import { PopupAddContext } from "../../context/PopupAddContext";
import moment from "moment";

class PageTableList extends Component {
  // Component that render a list table with the props he receives
  // isLoading = message displayed when the user change the current page
  // isLoadingUpdate = message displayed when the user try to update
  // listOfTh = object of data received in props. This data corresponds to what we want to display in the table header.
  // listOfData = empty array which will be replaced by the data received by the fetch API (the link is also provided in props)

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingUpdate: false,
      errorMessageAdminLevel: false,
      listOfTh: props.th,
      listOfData: [],
      adminLevel: "",
    };
    this._isMounted = false;
  }

  // get the context of popupaddcontext

  static contextType = PopupAddContext;

  // When the component is mount, the isloading state is set to true and fetch the data to the api (link provided in props)
  // if there are not error, set the listOfData
  // then set the isloading to false

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      isLoading: true,
    });
    this.getList();

    // initialize the popup context to false at each page change
    if(this.context){
      this.context.setToggle(false);
    }
    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getList = () => {
    fetch(this.props.linkapi, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (this._isMounted) {
          if (!result.error) {
            this.setState({
              listOfData: result.data,
              adminLevel: result.adminLevel,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        }
      });
  };

  // This method allow to update the isactive field, depending on the API link (linkputapi or the linkapi) and the id and boolean passed in parameter
  // When this method is called, the isLoadingUpdate state is set to true and when the fetch operation is finished, this state is set to false

  handleRequestFetch = (id, method, body = undefined) => {
    this.setState({
      isLoadingUpdate: true,
    });
    const linkupdate = this.props.linkputapi || this.props.linkapi;
    fetch(`${linkupdate}/${id}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          this.setState({
            isLoadingUpdate: false,
          });
        } else {
          if (result.message === "Not authorized admin level") {
            this.setState({
              isLoadingUpdate: false,
              errorMessageAdminLevel: true,
            });
            setTimeout(() => {
              this.setState({
                errorMessageAdminLevel: false,
              });
            }, 1500);
          }
        }
        if (method === "DELETE") {
          this.getList();
        }
      });
  };

  // Render the display of the table depending the states. Mapping over the listOfTh and the listOfData object keys in array and compare them in order to display the table correctly

  render() {
    const {
      listOfData,
      listOfTh,
      isLoading,
      isLoadingUpdate,
      adminLevel,
      errorMessageAdminLevel,
    } = this.state;

    return isLoading ? (
      <p className="bg-success text-white p-2">Loading....</p>
    ) : (
      <>
        {errorMessageAdminLevel && (
          <p className="bg-danger text-white p-2">
            Vous n'avez pas les droits nécessaires pour effectuer cette
            action....
          </p>
        )}
        <h4 className="titlepage">{this.props.titlepage}</h4>
        {isLoadingUpdate && (
          <p className="bg-success text-white p-2">Loading....</p>
        )}
        <div className="text-right p-3">
          {this.props.titlebutton && this.props.linkbutton ? (
            <Link to={`${this.props.link}/add`}>
              <button className="btn text-white bgcolor3c8ce4">
                {this.props.titlebutton}
              </button>
            </Link>
          ) : (
            <button
              className="btn text-white bgcolor3c8ce4"
              onClick={() => this.context.setToggle(!this.context.isToggle)}
            >
              {this.props.titlebutton}
            </button>
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {listOfTh.map((elt, index) => {
                  if (elt.delete && adminLevel === "superadmin") {
                    return (
                      <th className="text-center" key={index}>
                        {Object.values(elt)}
                      </th>
                    );
                  } else if (!elt.delete) {
                    return (
                      <th className="text-center" key={index}>
                        {Object.values(elt)}
                      </th>
                    );
                  }
                  return true;
                })}
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
                            <Link
                              key={`link${indexData}`}
                              to={`${this.props.link}/${eltData["_id"]}`}
                            >
                              Voir
                            </Link>
                          </td>
                        ) : subTh === "delete" &&
                          adminLevel === "superadmin" ? (
                          <td
                            className="text-center"
                            key={`delete${indexData}`}
                          >
                            <i
                              className="ri-delete-bin-6-fill ri-xl"
                              onClick={() =>
                                this.handleRequestFetch(
                                  eltData["_id"],
                                  "DELETE"
                                )
                              }
                            ></i>
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
                                  <SwitchButton
                                    onlabel="Actif"
                                    offlabel="Inactif"
                                    isActive={eltData["isActive"]}
                                    id={eltData["_id"]}
                                    change={() => {
                                      this.handleRequestFetch(
                                        eltData["_id"],
                                        "PUT",
                                        JSON.stringify({
                                          isActive: !eltData["isActive"],
                                        })
                                      );
                                    }}
                                    handleIsActive={this.handleRequestFetch}
                                  />
                                ) : subTh === "isTop" ? (
                                  <SwitchButton
                                    onlabel="Top"
                                    offlabel="Non"
                                    isActive={eltData["isTop"]}
                                    id={eltData["_id"]}
                                    change={() => {
                                      this.handleRequestFetch(
                                        eltData["_id"],
                                        "PUT",
                                        JSON.stringify({
                                          isTop: !eltData["isTop"],
                                        })
                                      );
                                    }}
                                    handleIsActive={this.handleRequestFetch}
                                  />
                                ) : subTh === "description" ? (
                                  `${eltData.description.slice(0, 30)}...`
                                ) : subTh === "date_register" ||
                                  subTh === "start_date" ||
                                  subTh === "end_date" ? (
                                  moment(eltData[subData]).format("DD/MM/YYYY")
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
