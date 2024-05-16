import React from "react";
import { StyledButton } from "./Button.styles";

const Button = ({
  children,
  gap,
  sm,
  lg,
  outline,
  variant,
  width,
  loader,
  disable,
  block,
  custom,
  xsCustom,
  ...rest
}) => {
  return (
    <StyledButton
      $xsCustom={xsCustom}
      $sm={sm}
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
