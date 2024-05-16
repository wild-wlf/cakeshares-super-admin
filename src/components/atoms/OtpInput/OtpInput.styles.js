import styled from "styled-components";

export const OtpInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  gap: 5px;
  input {
    outline: none;
    max-width: 88px;
    border: 0.8px solid var(--gray-150);
    border-radius: 20px;
    padding: 20px 35px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    &::placeholder {
      font-size: 35px;
      line-height: 20px;
      color: var(--gray-150);
    }
  }
`;
