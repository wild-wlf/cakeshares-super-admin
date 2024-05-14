import styled from "styled-components";

export const StyledCheckBox = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: flex-start;
  .custom-checkbox {
    height: 100%;
    display: flex;
    align-items: flex-start;
    input[type="checkbox"] {
      position: relative;
      border: 2px solid #408f8c;
      border-radius: 2px;
      background: none;
      cursor: pointer;
      line-height: 0;
      margin: 0 0.6em 0 0;
      outline: 0;
      padding: 0 !important;
      vertical-align: text-top;
      height: 20px;
      width: 20px;
      appearance: none;
      opacity: 0.5;
    }

    input[type="checkbox"]:hover {
      opacity: 1;
    }

    input[type="checkbox"]:checked {
      background-color: #408f8c;
      opacity: 1;
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      right: 50%;
      top: 50%;
      width: 6px;
      height: 12px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      margin: -1px -1px 0 -1px;
      transform: rotate(45deg) translate(-50%, -50%);
      z-index: 2;
    }
  }
`;
