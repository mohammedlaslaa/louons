import React from "react";

// initialize the context. this context return all the category

const ListCategoryContext = React.createContext();

class ListCategoryProvider extends React.Component {
  state = {
    listCat: [],
  };

  // Fetch the list of category

  componentDidMount = () => {
    fetch("category/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          listCat: result.data,
        });
      });
  };

  render() {
    const { listCat } = this.state;
    // Render the provider and give the access of the listSubCat to his children

    return (
      <ListCategoryContext.Provider value={{ listCat }}>
        {this.props.children}
      </ListCategoryContext.Provider>
    );
  }
}

// Export the provider and the context in order to have access wherever it's needed

export { ListCategoryProvider, ListCategoryContext };
