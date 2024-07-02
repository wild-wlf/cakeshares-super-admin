import styled, { css } from 'styled-components';

export const PermissionListGroup = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: 10px;
`;

export const PermissionListHead = styled.div`
  border-bottom: 1px solid var(--light-gray);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ topHead }) =>
    topHead &&
    css`
      margin-bottom: 30px;
      border: none;
      .Search {
        width: 265px;
      }
    `}
`;
