import React from "react";
import { StyledCheckBox } from "./CheckBox.styles";

const CheckBox = ({ label, color }) => {
  return (
    <StyledCheckBox $color={color}>
      <div className="custom-checkbox">
        <input id={label} type="checkbox" value={label} />
      </div>
      {label && (
        <label className="label-title" htmlFor={label}>
          {label}
        </label>
      )}
    </StyledCheckBox>
  );
};

export default CheckBox;
