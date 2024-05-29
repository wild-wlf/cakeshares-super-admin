import styled from 'styled-components';

export const StyledUserDetailModal = styled.div`
  .heading {
    display: block;
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    margin-bottom: 10px;
    @media (min-width: 768px) {
      margin-bottom: 15px;
    }
  }
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

      .flag-holder {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        .img-holder {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .col-holder,
  .head,
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      display: block;
    }
  }

  .col-holder {
    align-items: flex-end;
    flex-flow: wrap;

    .col {
      width: 100%;
      @media (min-width: 768px) {
        width: 48%;
      }
      .head {
        margin-bottom: 16px;
        .heading {
          margin-bottom: 0;
        }
      }
      .button {
        width: 100%;
        max-width: 80px;
        padding: 10px;
        border-radius: 60px;
        background: #edeff5;
        color: #4e6199;
        text-align: center;
      }
    }
  }
  .inheritance-info {
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 20px;
    @media (max-width: 575px) {
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
    }
    .col {
      cursor: pointer;
      @media (max-width: 991px) {
        width: 32%;
        border: none;
      }
      @media (max-width: 575px) {
        width: 47%;
      }
      .img-holder {
        display: block;
        margin-bottom: 5px;
      }
    }
  }
  .btn-holder {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;
