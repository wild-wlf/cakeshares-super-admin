import React, { useState, useEffect } from 'react';
import { StyledChatMessage, MessageContainer, ReactionContainer, GroupReaction } from './ChatMessage.styles';
import Pic from '../../../../../public/assets/user-img.png';
import { LiaCheckDoubleSolid, LiaCheckSolid } from 'react-icons/lia';
import Image from 'next/image';
import { format } from 'date-fns';
import RenderTextMessage from './renderTextMessage';
import { sendGroupReaction } from '@/helpers/socketConnection';
import reactionIcon from '../../../../../public/assets/reaction.png';
import ReactionTooltip from '@/components/atoms/ReactionTooltip';
import MessageReaction from '@/components/atoms/MessageReactions/index';

const ChatMessage = ({
  showImage,
  message,
  time,
  type,
  readBy,
  messageId,
  receivers,
  senderId,
  chatType,
  showReaction,
  defaultGroupReactions,
  channelName,
}) => {
  const [isMessageRead, setIsMessageRead] = useState(readBy);
  const [reaction, setReactions] = useState('');
  const [active, setActive] = useState(false);
  const [receivedGroupReaction, setReceivedGroupReaction] = useState([]);

  useEffect(() => {
    if ((chatType === 'community' || chatType == 'stakeholder') && reaction) {
      sendGroupReaction({
        reaction,
        messageId,
        senderId,
        channelName,
      });
    }
  }, [reaction, chatType, messageId, senderId]);

  useEffect(() => {
    window.addEventListener('seen_message_response', event => {
      const currentMessage = event.detail;

      if (messageId === currentMessage?._id && currentMessage?.readBy?.length >= receivers?.length) {
        setIsMessageRead(true);
      }
    });

    const handelGroupReaction = event => {
      const currentMessage = event.detail;

      if (messageId === currentMessage?.messageId && currentMessage?.reactions) {
        console.log('event recuvwd asda');
        setReceivedGroupReaction(currentMessage?.reactions);
      }
    };

    window.addEventListener('added-group-reaction', handelGroupReaction);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('seen_message_response', () => {});
      window.removeEventListener('added-group-reaction', handelGroupReaction);
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
        <MessageContainer>
          {showReaction && (
            <ReactionContainer>
              <ReactionTooltip
                data={<MessageReaction setActive={setActive} setReaction={setReactions} />}
                type="primary"
                width={230}
                active={active}
                setActive={setActive}
                alignRight={true}>
                <Image src={reactionIcon} alt="add reaction" height={22} width={22} />
              </ReactionTooltip>
            </ReactionContainer>
          )}
          <div className="message">
            <p>
              <RenderTextMessage text={message} />
            </p>
          </div>
          {(chatType === 'community' || chatType === 'stakeholder') &&
            (defaultGroupReactions?.length > 0 || receivedGroupReaction?.length > 0) && (
              <GroupReaction type={'count'}>
                <span>
                  {receivedGroupReaction.length > 0
                    ? `${receivedGroupReaction[0]?.reaction}${
                        receivedGroupReaction.length > 1 ? ` +${receivedGroupReaction.length - 1}` : ''
                      }`
                    : `${defaultGroupReactions[0]?.reaction}${
                        defaultGroupReactions.length > 1 ? ` +${defaultGroupReactions.length - 1}` : ''
                      }`}
                </span>
              </GroupReaction>
            )}
        </MessageContainer>
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
