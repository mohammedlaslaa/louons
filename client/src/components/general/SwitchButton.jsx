import React, { useState } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function SwitchButton(props) {
  const [isActive, setIsActive] = useState(props.isActive);

  return (
    <BootstrapSwitchButton
      checked={isActive}
      onlabel={props.onlabel}
      offlabel={props.offlabel}
      size="xs"
      width="70"
      onChange={() => {
        props.change();
        setIsActive(!isActive)
      }}
    />
  );
}

export default SwitchButton;
