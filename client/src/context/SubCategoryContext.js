import React from "react";

// initialize the context. this context return all the category 

const ListSubCategoryContext = React.createContext();

class ListCategoryProvider extends React.Component {
  state = {
    listSubCat: [],
  };

  // Fetch the list of category
  componentDidMount = () => {
    fetch("http://localhost:5000/louons/api/v1/category")
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          listSubCat: result,
        })
      );
  };

  render() {
    const { listSubCat } = this.state;
    // Render the provider and give the access of the listSubCat to his children
    return (
      <ListSubCategoryContext.Provider value={{ listSubCat }}>
        {this.props.children}
      </ListSubCategoryContext.Provider>
    );
  }
}

// Export the provider and the context in order to have access wherever it's needed

export { ListCategoryProvider, ListSubCategoryContext };
