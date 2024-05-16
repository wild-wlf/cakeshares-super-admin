import styled from "styled-components";
// import Select from '../Select';

export const StyledTableHeader = styled.div`
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  font-size: var(--font-size-xs);
  color: var(--gray);

  @media (min-width: 768px) {
    font-size: var(--font-size-sm);
  }
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-family: "Outfit", sans-serif;
    .table-heading {
      display: block;
      font-size: 22px;
      line-height: 25px;
      font-weight: 500;
      text-transform: capitalize;
      margin: 0 0 15px;
    }
    .btn-holder {
      display: flex;
      gap: 1px;
      background: var(--gray-3);
      border-radius: 60px;
      overflow: hidden;
      width: 100%;
      max-width: 200px;
      button {
        width: 100%;
        max-width: 100px;
        font-weight: 400;
        padding: 12px;
        border-radius: 60px;
        &.active,
        &:hover {
          background: var(--green);
          color: var(--white);
        }
      }
    }
    .actions {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      .Search {
        height: 40px;
        width: 291px;
        input {
          font-size: 14px;
          line-height: 18px;
          color: rgba(49, 49, 49, 1);
          background-color: rgba(246, 248, 250, 1);
        }
      }
    }

    ${({ filterBlock }) =>
      filterBlock &&
      css`
        @media only screen and (max-width: 768px) {
          .actions {
            flex-direction: column;
            button {
              width: 100%;
            }
          }
        }
      `}

    .icon-div {
      display: flex;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: rgba(246, 248, 250, 1);
      border-radius: 50px;
      cursor: pointer;
    }

    @media only screen and (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
      .item {
        width: 100%;
      }
    }

    @media (max-width: 800px) {
      gap: 10px;
      .table-heading {
        margin: 0;
      }
    }
  }
`;

export const TotalResult = styled.span``;

export const ResultPerPage = styled.div`
  display: flex;
  align-items: center;
`;

// export const StyledSelect = styled(Select)`
//   margin-left: 5px;
//   .react-select__control {
//     padding-left: 10px;
//     width: 80px;
//     height: 35px;
//     min-height: 35px;
//   }
//   .react-select__indicators {
//     transform: translateX(25px);
//   }
// `;
