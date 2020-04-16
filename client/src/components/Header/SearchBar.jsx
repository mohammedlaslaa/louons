import React from "react";

function SearchBar() {
  return (
    <div className="col-3 col-lg-2 d-none d-md-block">
      <form action="">
        <div className="form-group has-search my-auto">
          <i className="ri-search-line form-control-feedback"></i>
          <input
            className="w-100 form-control"
            type="text"
            placeholder="Rechercher"
            name="search"
          />
        </div>
      </form>
    </div>
  );
}
export default SearchBar;
