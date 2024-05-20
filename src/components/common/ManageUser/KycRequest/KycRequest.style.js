import styled from 'styled-components';

export const StyledKycRequest = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: #313131;
  .title {
    display: block;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;
  }
  .wrapperTitle {
    display: block;
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

    .uploadedDocDetail {
      display: flex;
      align-items: center;
      gap: 10px;
      .docType {
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--white);
        padding: 5px;
        img {
          width: 100%;
          height: auto;
        }
      }
      span {
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .actionButton {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 20px;
      .view,
      .download {
        width: 26px;
        height: 26px;
        border-radius: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(64, 143, 140, 0.1);
        cursor: pointer;
      }
      .download {
        background: rgba(78, 97, 153, 0.1);
      }
    }
  }
  .btnWrap {
    button {
      &:nth-child(1) {
        margin-bottom: 10px;
      }
    }
    @media screen and (min-width: 576px) {
      display: flex;
      gap: 10px;
      max-width: 356px;
      button {
        &:nth-child(1) {
          margin-bottom: 0px;
        }
      }
    }
  }
`;
