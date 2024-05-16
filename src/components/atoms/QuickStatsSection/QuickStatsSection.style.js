import styled from "styled-components";

export const QuickStatsSectionWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
  .column-wrapper {
    display: flex;
    flex-direction: column;
    gap: 17px;
    max-width: 416px;
    width: 100%;
  }
  .container {
    padding: 28px 16px;
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
    strong {
      font-size: 36px;
      line-height: 40px;
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
    width: 75%;
  }

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    .column-wrapper {
      display: flex;
      flex-direction: row;
      gap: 17px;
      max-width: none;
    }
    .container {
      width: 50%;
    }
    .chart-container {
      width: 100%;
    }
  }
  @media only screen and (max-width: 768px) {
    .column-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .container {
      width: 100%;
    }
    .value-wrapper {
      .heading {
        font-size: 16px;
        .icon {
          font-size: 20px;
        }
      }
      h1 {
        font-size: 30px;
      }
      .green-text {
        font-size: 14px;
      }
      .desc {
        font-size: 14px;
      }
    }
  }
`;
