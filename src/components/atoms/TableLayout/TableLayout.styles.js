import styled, { css } from 'styled-components';
import { PaginationList } from '../../molecules/Pagination/Pagination.styles';

export const StyledTableLayout = styled.div`
  width: 100%;
  /* padding:  15px 10px; */
  border-radius: 20px;
  border: none;
  box-shadow: none;
  margin: ${({ noNegativeMargin }) => (noNegativeMargin ? '' : '0 0 0')};
  background: var(--white);
  overflow: hidden;
  font-family: 'Outfit', sans-serif;

  @media (min-width: 768px) {
    padding: ${({ $noPadding }) => ($noPadding ? '0' : '20px')};
    border: 1px solid #d9d9d9;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05), -10px 10px 20px rgba(0, 0, 0, 0.05);
  }

  ${({ noPagination }) =>
    noPagination &&
    css`
      ${PaginationList} {
        display: none;
      }
    `}
  ${({ $noBorder }) =>
    $noBorder &&
    css`
      border: none !important;
      box-shadow: none !important;
    `}

    .pagination {
    /* background: var(--gray-4); */
    /* border-radius: 0 0 10px 10px; */
  }
`;
