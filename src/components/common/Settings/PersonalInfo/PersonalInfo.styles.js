import styled from 'styled-components';

export const StyledPersonalInfo = styled.div`
  .img-holder {
    display: flex;
    justify-content: center;
  }
  .form {
    margin-bottom: 40px;
  }
  .input-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }
  .message {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(215, 65, 32, 0.05);
    border-radius: 16px;

    strong {
      color: var(--green);
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
