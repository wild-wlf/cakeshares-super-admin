import React from "react";
import { StyledButton } from "./Button.styles";

const Button = ({
  children,
  gap,
  lg,
  outline,
  variant,
  width,
  loader,
  disable,
  block,
  custom,
  ...rest
}) => {
  return (
    <StyledButton
      $lg={lg}
      $block={block}
      $outline={outline}
      $variant={variant}
      $gap={gap}
      $width={width}
      $custom={custom}
      disabled={disable || loader}
      {...rest}
    >
      {loader ? <span class="loader"></span> : children}
    </StyledButton>
  );
};

export default Button;
