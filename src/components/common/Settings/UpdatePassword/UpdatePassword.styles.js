import styled from 'styled-components';

export const StyledUpdatePassword = styled.div`
  .heading {
    display: block;
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .text {
    font-size: 16px;
    line-height: 20px;
    color: var(--gray);
    margin-bottom: 30px;

    @media (min-width: 1400px) {
      font-size: 18px;
      line-height: 22px;
    }
  }
  .input-wrap {
    margin-bottom: 30px;
    @media (min-width: 1200px) {
      display: flex;
      gap: 20px;
    }
  }
`;
