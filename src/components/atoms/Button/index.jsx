import React from 'react';
import { StyledButton } from './Button.styles';

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
  type,
  ...rest
}) => (
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
    type={type}
    disabled={disable || loader}
    {...rest}>
    {loader ? <span className="loader" /> : children}
  </StyledButton>
);

export default Button;
