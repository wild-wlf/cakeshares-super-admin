import styled from 'styled-components';

export const StyledProfileSetting = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  gap: 20px;

  .side-bar {
    width: 100%;
    max-width: 320px;
    padding: 40px 20px;
    border-radius: 30px;
    background: var(--white);
    box-shadow: 0px 217px 61px 0px rgba(0, 0, 0, 0), 0px 139px 56px 0px rgba(0, 0, 0, 0.01),
      0px 78px 47px 0px rgba(0, 0, 0, 0.03), 0px 35px 35px 0px rgba(0, 0, 0, 0.04), 0px 9px 19px 0px rgba(0, 0, 0, 0.05);
    margin-top: -100px;

    .img-holder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 22px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .name,
    .email {
      display: block;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 30px;
    }

    .name {
      font-size: 18px;
      line-height: 22px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--gray-2);
      cursor: pointer;
      &:nth-last-child(1) {
        border-bottom: none;
        padding: 10px 0 0 0;
      }
      &.active {
        color: var(--green);
        font-weight: 600;
      }
    }
  }
  .tab-content {
    width: 100%;
    min-height: 520px;
    border-radius: 30px;
    background: var(--white);
    padding: 30px;
    box-shadow: 0px 217px 61px 0px rgba(0, 0, 0, 0), 0px 139px 56px 0px rgba(0, 0, 0, 0.01),
      0px 78px 47px 0px rgba(0, 0, 0, 0.03), 0px 35px 35px 0px rgba(0, 0, 0, 0.04), 0px 9px 19px 0px rgba(0, 0, 0, 0.05);
  }
`;
