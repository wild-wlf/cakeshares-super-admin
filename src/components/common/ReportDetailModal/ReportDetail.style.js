import styled from 'styled-components';

export const ChatWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  position: relative;
  padding-top: 20px;
  /* overflow: hidden; */
  .chatWrapper {
    width: 100%;
    position: relative;
  }
`;

export const ChatBody = styled.div`
height: 600px;
  overflow: auto;
  padding-right: 8px;
  overflow-x: hidden;

  .messages-holder {
    margin-bottom: 40px;
  }
`;
