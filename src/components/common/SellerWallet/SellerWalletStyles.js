import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  padding: 30px 30px 0px 30px;
  font-family: var(--base-font-sans-serif);
  z-index: 5;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
  .ChartContainer {
    width: 32%;
  }

  @media (max-width: 1235px) {
    flex-wrap: wrap;
    .ChartContainer {
      width: 339px;
    }
  }

  @media (max-width: 1107px) {
    flex-wrap: wrap;
    .ChartContainer {
      width: 100%;
    }
  }

  @media (max-width: 992px) {
    flex-wrap: wrap;
    .ChartContainer {
      width: 400px;
    }
  }

  @media (max-width: 910px) {
    flex-wrap: wrap;
    .ChartContainer {
      width: 350px;
    }
  }

  @media (max-width: 810px) {
    flex-wrap: wrap;
    .ChartContainer {
      width: 320px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .ChartContainer {
      width: 100%;
    }
  }
`;
