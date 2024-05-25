import styled from 'styled-components';
import Bg from '../../../../../public/assets/settings-banner-bg.png';

export const StyledBanner = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.bgImage || Bg.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
  box-shadow: 0px 223px 62px 0px rgba(0, 0, 0, 0), 0px 143px 57px 0px rgba(0, 0, 0, 0.01),
    0px 80px 48px 0px rgba(0, 0, 0, 0.03), 0px 36px 36px 0px rgba(0, 0, 0, 0.04), 0px 9px 20px 0px rgba(0, 0, 0, 0.05);

  .change-banner {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;
    border-radius: 60px;
    background: rgba(255, 255, 255, 0.2);
    color: var(--white);
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    cursor: pointer;

    .icon-holder {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #707279;
      border-radius: 50%;
    }
  }
`;
