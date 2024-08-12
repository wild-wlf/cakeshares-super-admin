import React, { useState, useEffect } from 'react';
import {
  StyledChatMessage,
  ReactionContainer,
  MessageContainer,
  AddedReaction,
  GroupReaction,
} from './ChatMessage.styles';
import Pic from '../../../../../public/assets/user-img.png';
import { LiaCheckDoubleSolid, LiaCheckSolid } from 'react-icons/lia';
import Image from 'next/image';
import { format } from 'date-fns';
import RenderTextMessage from './renderTextMessage';
import reactionIcon from '@/_assets/reaction.png';
import MessageReaction from '@/components/atoms/MessageReactions/index';
import ReactionTooltip from '@/components/atoms/ReactionTooltip';
import MenuButton, { MenuItem } from '../../../molecules/Menu/index';
import { sendGroupReaction } from '@/helpers/socketConnection';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineReport } from 'react-icons/md';
import ReportModal from '@/components/molecules/ReportModal';
import ModalContainer from '../../../molecules/ModalContainer';
import declineIcon from '../../../../_assets/decline-icon.svg';
import { findReactionByUserId } from '@/helpers/common';
import notificationService from '@/services/notificationservice';
import CenterModal from '@/components/molecules/Modal/CenterModal';
import ReactionListModal from '@/components/atoms/reactionListModal/ReactionListModal';

const ChatMessage = ({
  showImage,
  message,
  time,
  type,
  readBy,
  messageId,
  receivers,
  showReaction,
  group,
  chatType,
  senderId,
  defaultGroupReactions,
  channelName,
  item,
}) => {
  const [isMessageRead, setIsMessageRead] = useState(readBy);
  const [reaction, setReactions] = useState('');
  const [receivedGroupReaction, setReceivedGroupReaction] = useState([]);
  const [active, setActive] = useState(false);
  const [seeReaction, setSeeReaction] = useState(false);
  const [reactionData, setReactionData] = useState([]);
  const senderData = {
    _id: senderId,
    model_type: 'admin',
  };

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

  useEffect(() => {
    if ((chatType === 'community' || chatType == 'stakeholder') && reaction) {
      sendGroupReaction({
        reaction,
        messageId,
        senderId: senderData,
        channelName,
      });
    }
  }, [reaction, chatType, messageId, senderId, channelName]);

  useEffect(() => {
    const handelGroupReaction = event => {
      const currentMessage = event.detail;

      if (messageId === currentMessage?.messageId && currentMessage?.reactions) {
        setReceivedGroupReaction(currentMessage?.reactions);
      }
    };

    window.addEventListener('added-group-reaction', handelGroupReaction);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('added-group-reaction', handelGroupReaction);
    };
  }, [messageId, receivers]);

  const getReactionDetail = async () => {
    const res = await notificationService.getMessageReactions(messageId);
    if (res) {
      setReactionData(res?.reactionData);
      setSeeReaction(true);
    }
  };

  return (
    <>
      <CenterModal open={seeReaction} setOpen={setSeeReaction} title={'Reactions'} width="500">
        <ReactionListModal reactionData={reactionData} />
      </CenterModal>
      <StyledChatMessage $type={type}>
        {type === 'send' && (
          <div className="img-holder">
            <Image src={showImage || Pic} alt="user-pic" height={20} width={20} />
          </div>
        )}
        <div className="message-holder">
          <MessageContainer>
            <div className="message-content">
              <div className="message">
                <p>
                  <RenderTextMessage text={message} />
                </p>
              </div>
              {showReaction && (
                <>
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
                </>
              )}
            </div>
            {showReaction && (
              <>
                <ModalContainer
                  md
                  width={700}
                  title={<Image src={declineIcon} alt="declineIcon" />}
                  btnComponent={({ onClick }) => (
                    <MenuButton
                      icon={
                        <span>
                          <BsThreeDotsVertical />
                        </span>
                      }>
                      <MenuItem onClick={onClick} icon={<MdOutlineReport size={20} />}>
                        {' '}
                        Report
                      </MenuItem>
                    </MenuButton>
                  )}
                  content={({ onClose }) => (
                    <ReportModal onClose={onClose} item={item} title="Report this Message!" btnText="Report" />
                  )}
                />
              </>
            )}

            {(chatType === 'community' || chatType === 'stakeholder') &&
              (defaultGroupReactions?.length > 0 || receivedGroupReaction?.length > 0) && (
                <GroupReaction
                  type={'count'}
                  onClick={() => {
                    getReactionDetail();
                  }}>
                  <span>
                    {receivedGroupReaction.length > 0
                      ? `${findReactionByUserId(receivedGroupReaction, senderId)}${
                          receivedGroupReaction.length > 1 ? ` +${receivedGroupReaction.length - 1}` : ''
                        }`
                      : `${findReactionByUserId(defaultGroupReactions, senderId)}${
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
    </>
  );
};

export default ChatMessage;
