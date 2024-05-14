import React from 'react';

import { v4 } from 'uuid';
import { StyledTooltip, TooltipBtn } from './Tooltip.styles';

function Tooltip({ children, title, width, type, isVerified }) {
  const id = v4();
  return (
    <span className={`tooltip-holder ${isVerified === true ? 'red_dot' : ''}`}>
      <TooltipBtn data-for={id} data-tip data-iscapture="true">
        {children}
      </TooltipBtn>
      <StyledTooltip id={id} place="top" type={type} effect="solid" width={width}>
        {title}
      </StyledTooltip>
    </span>
  );
}

export default Tooltip;
