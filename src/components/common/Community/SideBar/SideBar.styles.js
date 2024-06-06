import styled, { css } from 'styled-components';

export const StyledSideBar = styled.div`
  max-width: 320px;
  background: var(--gray-2);
  padding: 20px 22px;
  border-radius: 30px 0px 0px 0px;
  cursor: pointer;
  /* .group-holder {
    height: 500px;
    overflow-y: auto;
    margin: 0 -20px;
    padding: 0 20px;
  } */
  .tabs-holder {
    max-width: 280px;
    background-color: var(--white);
    display: flex;
    margin: 0 auto;
    border-radius: 60px;
    margin-bottom: 30px;
    cursor: pointer;

    .tab {
      width: 50%;
      font-size: 14px;
      line-height: 18px;
      padding: 12px 15px;
      text-align: center;
      border-radius: 60px;
      transition: 0.3s;

      &.active {
        background: var(--green);
        color: var(--white);
      }
    }
  }
`;
