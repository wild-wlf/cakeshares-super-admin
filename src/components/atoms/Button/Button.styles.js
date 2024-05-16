import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $gap }) => ($gap ? $gap : "10px")};
  padding: 11px 15px;
  border-radius: 52px;
  font: 400 14px/17px "Outfit";
  width: ${({ $width }) => $width};
  min-width: 170px;
  background: var(--green);
  color: var(--white);
  transition: 0.3s all ease-in-out;

  &:hover {
    opacity: 0.85;
  }

  ${({ $sm }) =>
    $sm &&
    css`
      display: flex;
      align-items: center;
      padding: 8px 14px;
    `}
  ${({ $xsCustom }) =>
    $xsCustom &&
    css`
      display: flex;
      align-items: center;
      padding: 8px 12px;
      font-size: 12px;
    `}
  ${({ $lg }) =>
    $lg &&
    css`
      display: flex;
      align-items: center;
      padding: 14px 18px;
    `}
  ${({ $block }) =>
    $block &&
    css`
      width: 100%;
    `}
${({ $custom }) =>
    $custom &&
    css`
      width: max-content;
      min-width: max-content;
    `}
  /***** Background-Variants-Start *****/
  ${({ $variant }) =>
    $variant == "primary" &&
    css`
      background: var(--green-50);
    `}
  ${({ $variant }) =>
    $variant == "secondary" &&
    css`
      background: rgba(78, 97, 153, 0.1);
      color: var(--secondary-50);
    `}
  ${({ $variant }) =>
    $variant == "success" &&
    css`
      background: rgba(64, 143, 140, 0.1);
      color: var(--green);
    `}
  ${({ $variant }) =>
    $variant == "danger" &&
    css`
      background: rgba(215, 65, 32, 0.1);
      color: var(--danger-50);
    `}
  ${({ $variant }) =>
    $variant == "info" &&
    css`
      background: rgba(81, 178, 255, 0.1);
      color: #51b2ff;
    `}
  ${({ $variant }) =>
    $variant == "dark" &&
    css`
      background: #235d5e;
    `}
  /*****************Background Variants End*********************/


  /*****************Border Variants Start*********************/

  ${({ $outline }) =>
    $outline &&
    css`
      border: 1px solid #e5e5e5;
      background: transparent;
      color: var(--body-text);

      &:hover {
        border-color: var(--body-text);
      }
    `}
  ${({ $outline }) =>
    $outline == "primary" &&
    css`
      border: 1px solid var(--primary-500);
      background: transparent;
      color: var(--primary-500);

      &:hover {
        background: var(--primary-500);
        color: var(--white);
      }
    `}
  ${({ $outline }) =>
    $outline == "secondary" &&
    css`
      border: 1px solid var(--secondary-500);
      background: transparent;
      color: var(--secondary-500);

      &:hover {
        background: var(--secondary-500);
        color: var(--white);
      }
    `}
  ${({ $outline }) =>
    $outline == "success" &&
    css`
      border: 1px solid var(--success-500);
      background: transparent;
      color: var(--success-500);

      &:hover {
        background: var(--success-500);
        color: var(--white);
      }
    `}
  ${({ $outline }) =>
    $outline == "danger" &&
    css`
      border: 1px solid var(--danger-500);
      background: transparent;
      color: var(--danger-500);

      &:hover {
        background: var(--danger-500);
        color: var(--white);
      }
    `} /*****************Border Variants End*********************/

    .loader {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #fff;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
