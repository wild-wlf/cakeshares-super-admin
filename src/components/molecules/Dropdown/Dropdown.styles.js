import styled from "styled-components";

export const StyledSelectWrapper = styled.div`
  width: 100%;
  color: rgba(64, 143, 140, 1);
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  position: relative;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 18px;
  }
  &.selectProfile {
    max-width: 200px;
  }

  .textFilter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 82px;
    border: 1px solid rgba(64, 143, 140, 1);
    border: ${({ $active }) =>
      $active ? "1px solid rgba(64, 143, 140, 0.1)" : "1px solid var(--white)"};
    /* box-shadow: ${({ $active }) => $active && "0px 0px 4px 0px #c4f440"}; */
    background-color: rgba(64, 143, 140, 0.1);
    @media screen and (max-width: 768px) {
      padding: 8px 16px;
    }
  }
  .iconWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all ease-in-out;
    transform: ${({ $active }) => ($active ? "scale(-1)" : "scale(1)")};
  }
`;
export const ItemWrapper = styled.ul`
  width: 100%;
  z-index: 2;
  background: var(--white);
  border-radius: 20px;
  left: 0;
  position: absolute;
  top: 60px;
  /* padding: 10px 0; */
  box-shadow: 0px 24px 52px -14px rgba(29, 41, 57, 0.16);
  max-height: ${({ $height }) => ($height ? "120px" : "0%")};
  opacity: ${({ $height }) => ($height ? "1" : "0")};
  visibility: ${({ $height }) => ($height ? "visible" : "hidden")};
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar {
    width: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(64, 143, 140, 1);
  }
  /* transition: all 0.3s ease-in-out; */

  li {
    width: 100%;
    opacity: ${({ $height }) => ($height ? "1" : "0")};
    visibility: ${({ $height }) => ($height ? "visible" : "hidden")};
    padding: 8px 15px;
    z-index: 2;
    margin: 0 !important;
    cursor: pointer;
    text-align: left;
    transition: all ease-in-out 0.3s;

    &:hover {
      color: rgba(64, 143, 140, 1);
      background-color: rgba(64, 143, 140, 0.1);
    }
  }
`;
