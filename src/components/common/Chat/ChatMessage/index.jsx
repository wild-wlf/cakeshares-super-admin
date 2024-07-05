import React, { useState, useEffect } from 'react';
import { StyledChatMessage } from './ChatMessage.styles';
import Pic from '../../../../../public/assets/user-img.png';
import { LiaCheckDoubleSolid, LiaCheckSolid } from 'react-icons/lia';
import Image from 'next/image';
import { format } from 'date-fns';
import RenderTextMessage from './renderTextMessage';

const ChatMessage = ({ showImage, message, time, type, readBy, messageId, receivers }) => {
  const [isMessageRead, setIsMessageRead] = useState(readBy);

  useEffect(() => {
    window.addEventListener('seen_message_response', event => {
      const currentMessage = event.detail;

      if (messageId === currentMessage?._id && currentMessage?.readBy?.length >= receivers?.length) {
        setIsMessageRead(true);
      }
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('seen_message_response', () => {});
    };
  }, [messageId, receivers?.length]);

  return (
    <StyledChatMessage $type={type}>
      {type === 'send' && (
        <div className="img-holder">
          <Image src={showImage || Pic} alt="user-pic" height={20} width={20} />
        </div>
      )}
      <div className="message-holder">
        <div className="message">
          <p>
            <RenderTextMessage text={message} />
          </p>
        </div>
        {time && (
          <div className="time-holder">
            <span>{format(time, 'yyyy-MM-dd, hh:mma')}</span>
            <div className="icon">
              {isMessageRead ? <LiaCheckDoubleSolid size={18} /> : <LiaCheckSolid size={18} />}
            </div>
          </div>
        )}
      </div>
    </StyledChatMessage>
  );
};

export default ChatMessage;
