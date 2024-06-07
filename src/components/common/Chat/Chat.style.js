import styled from 'styled-components';

export const ChatWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  position: relative;
  overflow: hidden;
  .chatWrapper {
    width: 100%;
    position: relative;
    padding-bottom: 55px;
  }
  .hamburger {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 40px;

    @media screen and (min-width: 1199px) {
      display: none;
      position: static;
    }
  }
`;

export const ChatBody = styled.div`
  height: calc(100vh - 230px);
  overflow: auto;
  padding-right: 8px;
  .messages-holder {
    margin-bottom: 20px;
  }
`;
