import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function SearchBar(props) {
  
  return (
    // Render an input search bar with animation.

    <TransitionGroup >
      {props.isShown && (
        <CSSTransition classNames="searchanimation" timeout={1000}>
          <div
            className={`${props.specificClass} searchbar my-2 mx-auto`}
          >
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
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}
export default SearchBar;