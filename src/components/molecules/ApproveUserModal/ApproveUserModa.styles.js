import styled from 'styled-components';

export const ModalHolder = styled.div`
  padding: 20px 20px 30px;
  color: var(--matte-black);
  .img-holder {
    max-width: 170px;
    margin: 0 auto 20px;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .delete-icon {
      display: block;
      width: 100%;
      height: auto;
      color: var(--danger-dark);
    }
  }
  .heading {
    display: block;
    font-size: 24px;
    line-height: 28px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 30px;
  }
  .heading-2 {
    display: block;
    font-size: 34px;
    line-height: 38px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
  }
  .text {
    display: block;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto 30px;
  }
  .btn-holder {
    display: flex;
    justify-content: center;
  }
`;
