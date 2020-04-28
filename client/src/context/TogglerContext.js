import React, { useState } from "react";

// Initialize the context. This context return a toggler and his state 

const TogglerContext = React.createContext();

function TogglerProvider(props) {
  const [isToggle, setIsToggle] = useState(false);

  // Set the isToggle state to its opposite. The default value is false.

  const setToggle = (arg = !isToggle) => {
    setIsToggle(arg);
  };

  return (
    // Render the provider and give the access of the isToggle and the setToggled to his children

    <TogglerContext.Provider value={{ isToggle, setToggle }}>
      {props.children}
    </TogglerContext.Provider>
  );
}

// Export the provider and the context in order to have access wherever it's needed

export {TogglerProvider, TogglerContext};
