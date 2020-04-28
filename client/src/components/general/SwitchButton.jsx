import React, { useState } from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function SwitchButton(props) {
  const [isActive, setIsActive] = useState(props.isActive);

  return (
    <BootstrapSwitchButton
      checked={isActive}
      onlabel="Actif"
      offlabel="Inactif"
      size="xs"
      width="70"
      onChange={() => {
        props.handleIsActive(
          props.id,
          "PUT",
          JSON.stringify({ isActive: !isActive })
        );
        setIsActive(!isActive);
      }}
    />
  );
}

export default SwitchButton;
