import styled from "styled-components";

export const StyledUserDetailModal = styled.div`
  .heading {
    display: block;
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .product-info {
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
        content: "";
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
    }
  }
`;
