import styled from "styled-components";

export const QuickStatsSectionWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 30px;
  .column-wrapper {
    display: flex;
    flex-direction: column;
    gap: 17px;
    max-width: 416px;
    width: 100%;
  }
  .container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 20px;
    border: 1px solid rgba(205, 205, 205, 0.4);
    box-shadow: 0px 6px 13px 0px rgba(0, 0, 0, 0.13);
  }
  .value-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .heading {
      font-size: 18px;
      font-weight: 500;
      display: flex;
      gap: 7px;
      .icon {
        font-size: 24px;
        color: #408f8c;
      }
    }
    h1 {
      font-size: 42px;
      font-weight: 600;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .green-text {
      font-size: 16px;
      font-weight: 500;
      color: #419400;
    }
    .desc {
      font-size: 16px;
      font-weight: 300;
    }
  }

  .chart-container {
    width: 100%;
  }
`;
