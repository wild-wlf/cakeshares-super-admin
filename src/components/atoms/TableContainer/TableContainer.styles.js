import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  position: relative;

  .tableStyle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  @media only screen and (max-width: 1024px) {
    padding: 0px;
  }
  @media only screen and (max-width: 992px) {
    .tableStyle {
      display: none;
    }
  }
`;
