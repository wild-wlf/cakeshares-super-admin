import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 26px 0px 0px 0px;
  .personal-info,
  .bank-info,
  .kyc-info,
  .inheritance-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .inputWrapper {
    margin-bottom: 0px;
  }
  h5 {
    font-size: 18px;
    font-weight: 500;
  }
  .input-div {
    display: flex;
    gap: 26px;
  }
  .DOB-div {
    width: 48%;
  }
  .kyc-div {
    width: 48%;
    min-height: 69px;
    background-color: rgba(64, 143, 140, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 13px 15px 13px 15px;
    margin-bottom: 20px;
    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
    }
    .kyc-wrap {
      display: flex;
      gap: 10px;
    }
  }
  .upgrade-kyc {
    cursor: pointer;
    font-size: 12px !important;
    color: rgba(78, 97, 153, 1);
    font-weight: 500;
    text-decoration: underline;
  }
  .addmore {
    color: rgba(78, 97, 153, 1);
    font-weight: 500;
    font-size: 16px !important;
    padding-bottom: 20px;
    margin-top: -6px;
  }
  @media only screen and (max-width: 576px) {
    h5 {
      font-size: 16px;
    }
    .description {
      font-size: 16px;
    }
    .input-div {
      flex-direction: column;
      gap: 0px;
    }
    .DOB-div,
    .kyc-div {
      width: 100%;
    }
  }
`;
