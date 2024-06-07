import React from 'react';
import { ChatFooterWrapper } from './ChatFooter.style';
import Image from 'next/image';
import SendIcon from '../../../../../public/assets/send-icon.svg';
import LinkIcon from '../../../../../public/assets/link-icon.svg';
import MicIcon from '../../../../../public/assets/mic-icon.svg';
import PollIcon from '../../../../../public/assets/poll-icon.svg';
import GalleryIcon from '../../../../../public/assets/gallery-icon.svg';

const ChatFooter = () => {
  return (
    <ChatFooterWrapper>
      <div className="input-wrapper">
        <div className="input-div">
          <Image src={MicIcon} alt="PollIcon" width={14} height={14} />
          <input placeholder="Type your message..." />
        </div>
        <div className="icons-div">
          <Image src={PollIcon} alt="PollIcon" width={14} height={14} />
          <Image src={LinkIcon} alt="LinkIcon" width={14} height={14} />
          <Image src={GalleryIcon} alt="GalleryIcon" width={14} height={14} />
        </div>
      </div>
      <div className="send-icon">
        <Image src={SendIcon} alt="sendIcon" width={19} height={19} />
      </div>
    </ChatFooterWrapper>
  );
};

export default ChatFooter;
