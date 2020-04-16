import React from "react";

const ListSubCategoryContext = React.createContext();

class ListCategoryProvider extends React.Component {
  state = {
    listSubCat: [],
  };

 componentDidMount = () => {
    fetch("http://localhost:5000/louons/api/v1/category")
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          listSubCat: result
        })
      );
  }

  render() {
    const { listSubCat } = this.state;
    return (
      <ListSubCategoryContext.Provider value={{ listSubCat }}>
        {this.props.children}
      </ListSubCategoryContext.Provider>
    );
  }
}

export { ListCategoryProvider, ListSubCategoryContext };
