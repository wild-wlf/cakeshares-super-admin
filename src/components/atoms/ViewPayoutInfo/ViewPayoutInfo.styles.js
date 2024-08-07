import styled from 'styled-components';

export const DeleteModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-top: 20px;

  .product-info,
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: var(--gray-4);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 15px;
    @media (min-width: 992px) {
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 30px 25px;
    }
    .heading {
      display: block;
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    .text {
      display: block;
      font-size: 14px;
      line-height: 17px;
      font-weight: 300;
    }
    .col {
      padding: 0 15px;
      position: relative;
      @media (max-width: 991px) {
        width: 33.33%;
        border: 1px solid var(--gray);
        margin: 0 0 -1px -1px;
        padding: 10px;
        text-align: center;
      }
      @media (max-width: 575px) {
        width: 50%;
        padding: 5px;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -13px;
        width: 1px;
        height: 47px;
        background: var(--gray);
        @media (max-width: 991px) {
          display: none;
        }
      }
      &:first-child {
        @media (min-width: 991px) {
          padding-left: 0;
        }
        &:before {
          display: none;
        }
      }
      &:last-child {
        @media (min-width: 991px) {
          padding-right: 0;
        }
      }
    }
  }
  .title-div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    h2 {
      font-size: 24px;
      font-weight: 500;
    }
    span {
      font-size: 16px;
      font-weight: 400;
    }
  }
  .btn-wrapper {
    display: flex;
    gap: 10px;
    .danger {
      font-weight: 500;
    }
  }
  @media only screen and (max-width: 576px) {
    .title-div {
      h2 {
        font-size: 20px;
      }
      span {
        font-size: 14px;
      }
    }
  }
`;
