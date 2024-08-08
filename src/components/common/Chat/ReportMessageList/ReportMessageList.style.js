import styled from 'styled-components';
import css from 'styled-jsx/css';

export const StyledChatMessage = styled.div`
  position: relative;
  padding-left: 35px;
  margin-bottom: 40px;

  .message-holder {
    width: 100%;
  }

  .message {
    padding: 10px 15px;
    position: relative;
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    border-radius: 10px 0 10px 10px;
    background: ${({$wraning})=>$wraning?"red":"var(--green)"} ;
    color: var(--white);
    a {
      color:  var(--white);
      font-weight: 500;
      text-decoration: underline;
    }

    
  }

  .time-holder {
    display: flex;
    align-items: center;
    gap: 5px;
    position: absolute;
    bottom: -20px;
    right: 0;
    font-size: 12px;
    line-height: 16px;

   


  }

  .img-holder {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;

  .message-action-holder {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .user-name {
    font-size: 18px;
    line-height: 22px;
    flex-shrink: 0;
  }
  .user-img-name{
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const ReactionContainer = styled.div`
  position: absolute;
  top: 0px;
  right: -50px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const AddedReaction = styled.div`
  position: absolute;
  left: -10%;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(64, 143, 140, 0.5);
  span {
    font-size: 13px;
  }
`;

export const GroupReaction = styled.div`
  position: absolute;
  left: -10px;
  padding: 1px 3px;
  border-radius: 29%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(64, 143, 140, 0.5);
  span {
    font-size: 12px;
    white-space: nowrap;
    color: #fff;
  }
`;
