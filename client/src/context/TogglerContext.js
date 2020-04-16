import React, { useState } from "react";

const TogglerContext = React.createContext();

function ToggleProvider(props) {
  const [isToggle, setIsToggle] = useState(false);

  const setToggled = (arg = isToggle) => {
    setIsToggle(!arg);
  };

  return (
    <TogglerContext.Provider value={{ isToggle, setToggled }}>
      {props.children}
    </TogglerContext.Provider>
  );
}

export {ToggleProvider, TogglerContext};
