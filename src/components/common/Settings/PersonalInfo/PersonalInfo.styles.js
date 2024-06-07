import styled from 'styled-components';

export const StyledPersonalInfo = styled.div`
  .img-holder {
    display: flex;
    justify-content: center;
  }
  .form {
    margin-bottom: 30px;
    @media (min-width: 1200px) {
      margin-bottom: 40px;
    }
  }
  .input-wrap {
    margin-bottom: 20px;

    @media (min-width: 1200px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
  }
  .message {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(215, 65, 32, 0.05);
    border-radius: 16px;

    @media (min-width: 1400px) {
      padding: 20px;
    }
    span {
      @media (max-width: 1199px) {
        font-size: 14px;
        line-height: 18px;
      }
    }
    strong {
      color: var(--green);
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
