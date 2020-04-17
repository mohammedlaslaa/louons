import React from "react";

function SearchBar() {
  return (
    // Render an input search bar.
    
    <div className="col-3 col-lg-2 d-none d-md-block">
      <form action="" className="form-group has-search my-auto">
        <i className="ri-search-line form-control-feedback"></i>
        <input
          className="w-100 form-control"
          type="text"
          placeholder="Rechercher"
          name="search"
        />
      </form>
    </div>
  );
}
export default SearchBar;
