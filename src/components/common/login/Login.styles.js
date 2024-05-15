import styled from "styled-components";
import loginBg from "../../../../public/assets/loginBg.jpg";
export const StyledLogin = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  .loginWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 50%;
    padding: 20px;
    background: url(${loginBg.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .title {
      display: block;
      margin-bottom: 50px;
      color: var(--white);
      font-size: 34px;
      font-weight: 500;
      line-height: 38px;
      text-align: center;
      max-width: 344px;
    }
    .logo {
      max-width: 370px;
      margin-bottom: 40px;
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  .formWrap {
    max-width: 500px;
    width: 100%;
  }
  .loginBanner {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-basis: 50%;
    background: var(--green);
    padding: 20px 0 0 20px;
    .imageWrap {
      max-width: 900px;
    }
  }
  .formAction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .forgetPassword {
    color: var(--white);
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }
`;
