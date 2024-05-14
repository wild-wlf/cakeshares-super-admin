import styled from "styled-components";

export const Container = styled.div`
  padding-top: 26px;
  .heading {
    font-size: 20px;
    font-weight: 300;
    padding-bottom: 26px;
  }
  @media (max-width: 650px) {
    .heading {
      font-size: 16px;
    }
  }
`;

export const OptionsWrapper = styled.div``;

export const Option = styled.div`
  height: 130px;
  user-select: none;
  margin-bottom: 20px;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  display: flex;
  gap: 17px;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 24px;
  .contarinerBox {
    display: flex;
    gap: 80px;
  }
  .imgContainer {
    height: 75px;
    min-width: 75px;
  }
  .imgContainer img {
    height: 75px;
    width: 75px;
  }
  .textContainer {
    max-width: 320px;
    .optionName {
      font-size: 22px;
      font-weight: 500;
      padding: 9px 0;
    }
    p {
      font-size: 10px;
      font-weight: 300;
    }
  }

  @media (max-width: 650px) {
    .contarinerBox {
      gap: 30px;
    }
    .textContainer {
      .optionName {
        font-size: 14px;
      }
    }
    .custom-radio {
      margin-right: 10px;
    }
  }
  @media (max-width: 450px) {
    height: 165px;
    padding: 18px 16px;
    .contarinerBox {
      gap: 10px;
    }
    .custom-radio {
      margin-right: 10px;
    }
  }
  @media (max-width: 390px) {
    gap: 10px;
    .contarinerBox {
      gap: 0px;
    }
    .custom-radio {
      margin-right: 5px;
    }
  }
  .custom-radio {
    height: 100%;
    display: flex;
    align-items: flex-start;

    input {
      display: none;
    }
    input[type="radio"] + div {
      position: relative;
      display: inline-block;
      cursor: pointer;
      line-height: 1em;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    input[type="radio"] + div:before,
    input[type="radio"] + div:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      text-align: center;
      color: white;
      border-radius: 50%;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
    }
    input[type="radio"] + div:before {
      border: 1px solid #dadada;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      box-shadow: inset 0 0 0 0.2em #f1f1f1, inset 0 0 0 1.5em #f1f1f1;
    }
    input[type="radio"] + div:hover:before {
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      box-shadow: inset 0 0 0 0.3em white, inset 0 0 0 1.5em #c6c6c6;
    }
    input[type="radio"]:checked + div:before {
      border: 1px solid #408f8c;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      box-shadow: inset 0 0 0 0.1em white, inset 0 0 0 1.5em #408f8c;
    }
  }
`;
